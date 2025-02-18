import './App.css';
import React from "react";
import {Routes, Route} from 'react-router-dom';
import Auth from "./components/Auth/Auth.tsx";
import Main from "./components/Main/Main.tsx";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<Main/>}/>
                <Route path={"/auth"} element={<Auth/>}/>
            </Routes>
        </div>

    );
}
export default App;
