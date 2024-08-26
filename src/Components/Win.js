import React, {useState, useContext, useEffect} from 'react'
import { store } from '../store.js';
import { useNavigate } from "react-router-dom";

function Win() {

    const globalState = useContext(store);
    const { state, dispatch } = globalState;
    let winner = null;
    let history = useNavigate();

    const totalPoints1 = state.equipes[0].points.manche0.length + state.equipes[0].points.manche1.length + state.equipes[0].points.manche2.length;
    const totalPoints2 = state.equipes[1].points.manche0.length + state.equipes[1].points.manche1.length + state.equipes[1].points.manche2.length;

    if (totalPoints1 === 0 && totalPoints2 === 0) {
        history('/');
    }
    else if (totalPoints1 < totalPoints2) {
        winner = state.equipes[1].nom
    }
    else if (totalPoints1 > totalPoints2) {
        winner = state.equipes[0].nom
    }
    else {
        winner = null
    }
    
    return (
        <h1 className="text-4xl font-bold mb-8">
            {winner === null ? 'C\'est un match nul ;)' : 'L\'équipe '+winner+' remporte la partie ! :D'}
            <button className="block mt-8 mx-auto transition-all duration-200 text-white text-lg bg-purple-600 hover:bg-purple-700 p-10 pt-3 pb-3 rounded-lg mt-8" onClick={() => dispatch({type : 'RESTART_GAME'})}>Rejouer !</button>
        </h1>
        
        
    )
}

export default Win
