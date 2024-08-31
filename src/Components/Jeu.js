import React from 'react'
import { store } from '../store.js';
import { Navigate } from "react-router-dom";

class Jeu extends React.Component {
    static contextType = store

    constructor() {
        super();
        this.state = {
            finished: false,
            initialized: false,
            found: []
        }
        this.timer=this.timer.bind(this);
    }

    componentDidMount() {
        this.setState({
            currentCount: this.context.state.options.time,
            mots: this.context.state.manches[this.context.state.currentManche].wordsTofinds
        }, 
            () => {this.startTimer()}
        )
    }

    startTimer() {
        var intervalId = setInterval(this.timer, 1000);
        // store intervalId in the state so it can be accessed later:
        this.setState({
            currentWord: this.context.state.options.cycle ? this.state.mots[0] : this.state.mots[Math.floor(Math.random()*this.state.mots.length)],
            intervalId: intervalId,
        },
            () => {this.setState({initialized: true})}
        )
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }

    finish() {
        if(this.state.mots.length > 0) {this.state.mots.push(this.state.mots.shift())}
        this.context.dispatch({type: 'ADD_POINTS', payload : this.state.found});
        this.context.dispatch({type: 'MAJ_WORD_LIST_MANCHE', payload : this.state.mots});
        this.context.dispatch({type: 'CHANGE_CURRENT_TEAM'});
        this.setState({finished: true})
    }

    checkTimer() {
        if(this.state.currentCount <= 0 || this.state.mots.length === 0) {
            this.finish()
        }
    }

    timer() {
        this.setState({ currentCount: this.state.currentCount -1 }, () => {this.checkTimer()});
    }

    loseTime() {
        if(this.state.currentCount <= this.context.state.options.lostPasse){
            this.finish()
        } else {
            var i = 0;
            if(this.context.state.options.cycle) {
                this.state.mots.push(this.state.mots.shift())
            } else {
                i = Math.floor(Math.random()*this.state.mots.length);
            }
            const newWord = this.state.mots[i]
            if(newWord !== this.state.currentWord) {
                this.setState({currentWord: newWord});
            }
            this.setState({ currentCount: this.state.currentCount - this.context.state.options.lostPasse});
        }
    }

    updateTable() {
        if (this.state.mots.length > 0) {  
            var changeMots = this.state.mots.filter( (item) => item !== this.state.currentWord);
            this.setState({
                found: [...this.state.found, this.state.currentWord],
                mots: changeMots,
                currentWord: this.context.state.options.cycle ? changeMots[0] : changeMots[Math.floor(Math.random()*changeMots.length)]
            },
            () => {this.checkTimer()}
            )
        } else {
            this.finish()
        }
    }

    render() {
        return (
            <>
            {this.state.finished && (<Navigate to="/recap" replace={true} />)}
                {this.state.mots && this.state.currentWord ? (
                <>
                    <h1 className="text-4xl font-bold mb-5">Il reste <span className="text-purple-500">{this.state.currentCount}</span> secondes</h1>
                    <strong className="text-6xl font-bold mb-10">{this.state.currentWord}</strong>
                    <div className="flex mt-5">
                    <button onClick={() => this.updateTable()} className="text-white  text-2xl bg-green-600 hover:bg-green-800 px-6 py-3 rounded-lg mr-10">Trouvé !</button>
                    {this.context.state.currentManche!=0 || this.context.state.options.passeManche1 ? (<button onClick={() => this.loseTime()} className="text-white text-2xl bg-red-600 hover:bg-red-800 px-6 py-3 rounded-lg">Je passe</button>): null}    
                </div>
                </>
            ) : (
                <>
                    <h1 className="text-4xl font-bold mb-5">Chargement...</h1>
                    {/* <h1 className="text-4xl font-bold mb-5">une erreur s'est produite <a href="/" className="block bg-purple-600">Revenir à l'accueil</a></h1> */}
                </>
            )}
            </>
        )
    }
}

export default Jeu
