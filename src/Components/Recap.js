import React, {useState, useContext, useEffect} from 'react'
import { store } from '../store.js';
import { useNavigate } from "react-router-dom";

function Recap() {
    const globalState = useContext(store);
    const { state, dispatch } = globalState;
    let history = useNavigate();
    
    const [teamsInfo, setTeamsInfo] = useState(state.equipes)
    const [currentTeam, setCurrentTeam] = useState(state.currentPlayer === 1 ? state.equipes[0] : state.equipes[1])

    function handleClick() {
        if(state.currentManche === 10) {
            history('/win');
        } else {
            history('/jeu');
        }
    }

    // useEffect(() => {
    //     if(state.currentManche === 10) {
    //         history('/win');
    //     }
    // })


    if (state?.words.length < 1) {
        history('/');  
    }
    return (
        <>
        <h1 className="text-4xl font-bold mb-8 text-purple-600">Time's OP !</h1>
        <table className="table-auto  rounded-md overflow-hidden text-center shadow-base w-4/6">
            <thead>
                <tr>
                    <th className="py-3 px-2 border-box text-white bg-purple-800">Manche</th>
                    {teamsInfo.map((equipe, index) => <th key={index} className="py-3 text-white bg-purple-800">{equipe.nom}</th>)}
                </tr>
            </thead>
            <tbody>
                <tr className={state.currentManche === 0 ? 'bg-orange-300' : 'bg-purple-200' }>
                    <td className="py-3 px-2 border-box text-gray-800">Tout les mots</td>
                    {teamsInfo.map((equipe, index) => equipe.points.manche0.length !== 0 ? <td key={index} className="py-3 px-2 border-box text-gray-800">{equipe.points.manche0.length}</td> : <td key={index} className="py-3 px-2 border-box text-gray-800">/</td>)}
                </tr>
                <tr className={state.currentManche === 1 ? 'bg-orange-300' : 'bg-purple-200' }>
                    <td className="py-3 px-2 border-box text-gray-800">Un seul mot</td>
                    {teamsInfo.map((equipe, index) => equipe.points.manche1.length ? <td key={index} className="py-3 px-2 border-box text-gray-800 ">{equipe.points.manche1.length}</td> : <td key={index} className="py-3 px-2 border-box text-gray-800">/</td>)}
                </tr>
                <tr className={state.currentManche === 2 ? 'bg-orange-300' : 'bg-purple-200' }>
                    <td className="py-3 px-2 border-box text-gray-800">Le mime</td>
                    {teamsInfo.map((equipe, index) => equipe.points.manche2.length ? <td key={index} className="py-3 px-2 border-box text-gray-800 ">{equipe.points.manche2.length}</td> : <td key={index} className="py-3 px-2 border-box text-gray-800">/</td>)}
                </tr>
            </tbody>
        </table>
        {
        state.currentManche === 10 ?
        (<button onClick={() => handleClick()} className="transition-all duration-200 text-white text-lg bg-purple-800 hover:bg-purple-700 p-10 pt-3 pb-3 rounded-lg mt-8">Fin de la partie !</button>)
        :
        (<button onClick={() => handleClick()} className="transition-all duration-200 text-white text-lg bg-purple-800 hover:bg-purple-700 p-10 pt-3 pb-3 rounded-lg mt-8">c'est au tour de l'équipe {currentTeam.nom} !</button>)
        }
        </>
    )
}

export default Recap
