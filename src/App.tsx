import './App.css';
import React from "react";
import {Routes, Route, Navigate, Link} from 'react-router-dom';
import Auth from "./components/Auth/Auth.tsx";
import Main from "./components/Main/Main.tsx";
import NewPlaylist from "./components/NewPlaylist/NewPlaylist.tsx";
import ViewPlaylists from "./components/ViewPlaylists/ViewPlaylists.tsx";

const App = () => {
    return (
        <div className="App">
            <Link to={"/"} className={"link"}><h1 className={"linkText"}>Jammming</h1></Link>
            <Routes>
                <Route path={"/"} element={<Main/>}/>
                <Route path={"/auth"} element={<Auth/>}/>
                <Route path={"/create"} element={<NewPlaylist/>}/>
                <Route path={"/view"} element={<ViewPlaylists/>}/>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>

    );
}
export default App;
