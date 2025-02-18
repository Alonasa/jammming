import './App.css';
import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import Auth from "./components/Auth/Auth.tsx";
import Main from "./components/Main/Main.tsx";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<Main/>}/>
                <Route path={"/auth"} element={<Auth/>}/>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>

    );
}
export default App;
