import React from 'react'
import { StateProvider } from './store.js';
import { HashRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Components/Home.js';
import Jeu from './Components/Jeu.js';
import Win from './Components/Win.js';
import Recap from './Components/Recap.js';

function App() {

    return (
        <StateProvider>
        <div className="min-h-screen bg-gray-300 text-gray-900 font-sans flex justify-center items-center flex-col p-5 border-box">
        <Router>
            <Routes>
                <Route path="/jeu" element={<Jeu />} />
                <Route path="/recap" element={<Recap />} />
                <Route path="/win" element={<Win />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
        </div>
        </StateProvider>
    )
}

export default App
