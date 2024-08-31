import React, { useReducer, createContext } from 'react';

const initialState = {
    words : [],
    options : {
        passeManche1 : false,
        deckSize : 40,
        time : 30,
        lostPasse : 1
    },
    equipes : [
        {
            id: 'equipe1',
            nom: 'Equipe 1',
            color: 'text-red-600',
            points : {
                manche0 : [],
                manche1 : [],
                manche2 : []
            }
        },
        {
            id: 'equipe2',
            nom: 'Equipe 2',
            color: 'text-blue-600',
            points : {
                manche0 : [],
                manche1 : [],
                manche2 : []
            }
        },
    ],
    manches : [
        {
            index : 'manche 1',
            wordsTofinds : null
        },
        {
            index : 'manche 2',
            wordsTofinds : null
        },
        {
            index : 'manche 3',
            wordsTofinds : null
        }
    ],
    currentManche : 0,
    currentPlayer : 1, 

} // toutes les célébrités + un objet avec le nom de l'équipe + les points à chaque manche.



const store = createContext(initialState);

const { Provider } = store; // permet de transmettre au children les données


function chooseWords(ar, l) {
    let arrayWords = [];
    if(l >= ar.length) {
        arrayWords = ar
    } else {
        while(arrayWords.length < l) {
            
            let newWordToAdd = ar[Math.floor(Math.random()*ar.length)];

            const doublon = arrayWords.find(el => el === newWordToAdd);

            if(typeof doublon === 'undefined') {
                arrayWords = [...arrayWords, newWordToAdd]
            }
        }
    }
    return arrayWords;
}


const StateProvider = ({children}) => {
    const [state, dispatch] = useReducer((state, action) => {

        const {type, payload, customWords, optionName, value} = action;
        const {currentPlayer, currentManche, equipes, manches, words, options} = state;

        switch(type) {
            case 'RESTART_GAME' :
                return initialState;
            case 'UPDATE_OPTION' :
                options[optionName] = value;
                return {
                    ...state,
                    options: options
                };
            case 'ADD_TEAMS_NAME' :
                return {
                    ...state,
                    equipes: payload
                };
            case 'UPLOAD_WORDS' :
                return {
                    ...state,
                    words : customWords,
                };
            case 'ADD_WORDS' :
                const wordsList = chooseWords(words, options.deckSize);
                const wordsListToManche = state.manches.map( el => ({...el, wordsTofinds : wordsList}));
                return {
                    ...state,
                    words : wordsList,
                    manches : wordsListToManche
                };
            case 'CHANGE_CURRENT_TEAM' :
                
                let SwitchPlayer = currentPlayer === 1 ? 2 : 1;

                return {
                    ...state,
                    currentPlayer : SwitchPlayer
                };            
            case 'ADD_POINTS' :
            
                let player = currentPlayer === 1 ? 0 : 1; // obligé par rapport à l'index 0du tableau
                
                const updateTeam = equipes.map((equipe, index) => {
                    if(index === player) {
                        
                        return {
                            ...equipe,
                            points : {
                                ...equipe.points,
                                ['manche'+currentManche] : [...equipe.points['manche'+currentManche], ...payload]
                            }
                         }
                    }
                    else {
                        return {...equipe}
                    }
                })
                
                
                return {
                    ...state,
                    equipes : updateTeam
                };  

            case 'MAJ_WORD_LIST_MANCHE' :

            
                const updateManchesWord = manches.map((manche, index)=> {
                    if (index === currentManche ) {
                        return {...manche , wordsTofinds : payload }
                    }
                    else {
                        return {...manche}
                    }
                })

                let changeManche;

                if(payload.length === 0) {

                    if(currentManche < 2) {
                        changeManche = currentManche + 1;
                    }
                    else {
                        changeManche = 10;
                    }
                }
                else {
                    changeManche = currentManche; 
                }
                
                return {
                    ...state,
                    manches : updateManchesWord,
                    currentManche: changeManche
                }
            default:
                return state;
        }

        
    }, initialState);

    
    return <Provider value={{state, dispatch}}>{children}</Provider>;
}

export {store, StateProvider}