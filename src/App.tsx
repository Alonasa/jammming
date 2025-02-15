import './App.css';
import {useEffect, useState} from "react";
import {v4} from "uuid";
import styles from "./App.module.css"
import {SearchBar} from "./components/SearchBar/SearchBar.tsx";
import {SearchResults} from "./components/SearchResults/SearchResults.tsx";
import {Playlist} from "./components/Playlist/Playlist.tsx";
import {Button} from "@mui/material";
import axios from "axios";
import {CLIENT_ID, getToken, REDIRECT_URI, SpotifyApi} from "./api/spotify-api.ts";

const App = () => {
    let [tracks, setTracks] = useState([{name: "Diamonds", id: v4(), artists: [{name: "Rihanna"}]}, {
        name: "Diam",
        id: v4(),
        artists: [{name: "Hanna"}]
    }])
    let [loading, setLoading] = useState(false);
    let [playlist, setPlaylist] = useState([]);
    const SCOPES = 'user-read-private user-read-email'; // Add scopes as needed
    const AUTH_URL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`
    let [playlistTitle, setPlaylistTitle] = useState('');

    const initAuth = () => {
        getToken()
    }

    const setData = async (query) => {
        setLoading(true)
        setTracks([])
        SpotifyApi.getTracks(query)
            .then((res) => {
                console.log(res)
                setTracks(res.data.tracks.items)
                setLoading(false)
            })
    };

    return (
        <div className="App">
            <h1>Jammming</h1>
            <Button variant={"outlined"} style={{fontWeight: "bold", border: "3px solid"}} color={"success"}
                    href={AUTH_URL} onClick={initAuth}>Authorize SPOTIFY</Button>
            <SearchBar getQuery={setData}/>
            <div className={styles.main}>
                <SearchResults title={"Results"} tracks={tracks} loading={loading}/>
                {playlist.length > 0 && <Playlist title={playlistTitle} tracks={playlist}/>}
            </div>
        </div>
    );
}

export default App;
