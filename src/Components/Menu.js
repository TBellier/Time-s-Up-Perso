import React, {useContext} from 'react'
import { store } from '../store.js';

function Menu() {
    const globalState = useContext(store);
    const { state, dispatch } = globalState;

    const handleCheckBox = type => {
        // Get the checkbox
        let checkBox = document.getElementById(type);
        dispatch({type : 'UPDATE_OPTION', optionName : type, value : checkBox.checked});
    } 

    const handleNumber = type => {
        let number = document.getElementById(type).value;
        dispatch({type : 'UPDATE_OPTION', optionName : type, value : number});
    } 

    return (
    <div>
        <ui>
            <li>
                <input type="checkbox" id='passeManche1' name='passe' checked={state.options.passeManche1} onClick={() => handleCheckBox('passeManche1')}/>
                <label htmlFor="passeManche1">Possible de passer au premier tour</label>
            </li>
            <li>
                <input type="checkbox" id='cycle' name='cycle' checked={state.options.cycle} onClick={() => handleCheckBox('cycle')}/>
                <label htmlFor="cycle">Cartes recyclées dans l'ordre</label>
            </li>
            <li>
                <input type="number" id='deckSize' name='deck' onChange={() => handleNumber('deckSize')} min={5} max={100} value={state.options.deckSize} step={1}/>
                <label htmlFor="deckSize">Nombre de cartes</label>
            </li>
            <li>
                <input type="number" id='time' name='time' onChange={() => handleNumber('time')} min={10} max={120} value={state.options.time} step={1}/>
                <label htmlFor="passeBox">Temps par tour (secondes)</label>
            </li>
            <li>
                <input type="number" id='lostPasse' name='penalty' onChange={() => handleNumber('lostPasse')} min={0} max={10} value={state.options.lostPasse} step={1}/>
                <label htmlFor="passeBox">Pénalité pour passer (secondes)</label>
            </li>
        </ui>
    </div>
    );
}

export default Menu
