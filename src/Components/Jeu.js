import React, {useState, useContext, useEffect} from 'react'
import { store } from '../store.js';
import { useNavigate } from "react-router-dom";

function Jeu() {
    const globalState = useContext(store);
    const { state, dispatch } = globalState;
    const { currentManche } = state;
    let history = useNavigate();
    
    const [seconds, setSeconds] = useState(30);
    const [mots, setMots] = useState(state.manches[currentManche].wordsTofinds); // tout les mots de la manche

    const [found, setFound] = useState([]); // les mots trouvés par le joueur courrant
    const [currentWord, setCurrentWord] = useState( mots ? mots[Math.floor(Math.random()*mots?.length)] : null);

    useEffect(() => {
        if(mots) {

            let interval = null;
            if(seconds > 0 && mots.length !== 0) {
                interval = setInterval(() => {
                    setSeconds(seconds - 1);
                }, 1000);
            }
            else {
                dispatch({type : 'ADD_POINTS', payload : found});
                dispatch({type : 'MAJ_WORD_LIST_MANCHE', payload : mots});
                dispatch({type : 'CHANGE_CURRENT_TEAM'});
                history('/recap');
            }
    
            return () => clearInterval(interval);
        }

        history('/');

    })

    function looseTime () {
        
        const newWord = mots[Math.floor(Math.random()*mots.length)];

        setSeconds(seconds - 3);
        
        if(newWord !== currentWord) {
            setCurrentWord(newWord);
        }
    }

    function updateTable() {

        if (mots.length > 0) {  
            setFound( prevFound => [...prevFound, currentWord]);
            
            setMots(mots.filter( item => item !== currentWord));
            
            setCurrentWord(() => {
                const changeWord = mots[Math.floor(Math.random()*mots.length)];

                if (changeWord === currentWord) {
                    return mots[Math.floor(Math.random()*mots.length)];
                }
                else {
                    return changeWord
                }
            })
        }
    }

    return (
        <>
            {mots && currentWord ? (
            <>
                <h1 className="text-4xl font-bold mb-5">Il reste <span className="text-purple-500">{seconds}</span> secondes</h1>
                <strong className="text-6xl font-bold mb-10">{currentWord}</strong>
                <div className="flex mt-5">
                <button onClick={() => updateTable()} className="text-white  text-2xl bg-green-600 hover:bg-green-800 px-6 py-3 rounded-lg mr-10">Trouvé !</button>    
                <button onClick={() => looseTime()} className="text-white text-2xl bg-red-600 hover:bg-red-800 px-6 py-3 rounded-lg">Je passe</button>    
            </div>
            </>
        ) : (
            <h1 className="text-4xl font-bold mb-5">une erreur s'est produite <a href="/" className="block bg-purple-600">Revenir à l'accueil</a></h1>
        )}
        </>


    )
}

export default Jeu
