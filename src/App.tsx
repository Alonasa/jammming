import './App.css';
import React, {useEffect} from "react";
import {Link, Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Auth from "./components/Auth/Auth.tsx";
import Main from "./components/Main/Main.tsx";
import NewPlaylist from "./components/NewPlaylist/NewPlaylist.tsx";
import ViewPlaylists from "./components/ViewPlaylists/ViewPlaylists.tsx";
import UpdateTracks from "./components/UpdateTracks/UpdateTracks.tsx";

const App = () => {
    const location = useLocation();
    return (
        <div className="App">
            <Link to={"/"} className={"link"}><h1 className={"linkText"}>Jammming</h1></Link>
            {location.pathname !== '/auth' && <Main />}
            <Routes>
                {/*<Route path={"/"} element={<Main/>}/>*/}
                <Route path={"/auth"} element={<Auth/>}/>
                <Route path={"/"} element={<NewPlaylist/>}/>
                <Route path={"/view"} element={<ViewPlaylists/>}/>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>

    );
}
export default App;
