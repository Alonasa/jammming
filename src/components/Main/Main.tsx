import React, {KeyboardEvent, useEffect, useState} from 'react';
import {Playlist} from "../Playlist/Playlist.tsx";
import {Button} from "@mui/material";
import {getToken, refreshToken, SpotifyApi} from "../../api/spotify-api.ts";
import {SearchBar} from "../SearchBar/SearchBar.tsx";
import {SearchResults} from "../SearchResults/SearchResults.tsx";
import styles from "./Main.module.css"


const Main = () => {
    let [tracks, setTracks] = useState({
        items: []
    })
    let [loading, setLoading] = useState(false);
    let [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        getToken()
    }, []);

    const updateData = (res) => {
        setTracks(res.data.tracks)
        setLoading(false)
    }

    const setData = (query) => {
        setLoading(true)
        setTracks({items: []})
        SpotifyApi.getTracks(query)
            .then((res) => {
                updateData(res)
            })
            .catch(error => {
                if (error.status === 400) {
                    getToken()
                    SpotifyApi.getTracks(query)
                        .then((res) => {
                            updateData(res)
                        })
                } else if (error.status === 401) {
                    refreshToken()
                    SpotifyApi.getTracks(query)
                        .then((res) => {
                            updateData(res)
                        })

                }
            })
    };

    const setKeypressData = (e: KeyboardEvent<HTMLDivElement>, query) => {
        if (e.key === "Enter") {
            setData(query)
        }
    }

    const moveToPrevious = () => {
        SpotifyApi.moveThroughList(tracks.previous)
            .then(res => {
                setTracks(res.data.tracks)
            })
    }

    const moveToNext = () => {
        SpotifyApi.moveThroughList(tracks.next)
            .then(res => {
                setTracks(res.data.tracks)
            })
    }

    const checkDuplicates = (playlist, idx) => {
        return playlist.find(item => item.id === tracks.items[idx].id)
    }


    const updatePlaylist = (idx) => {
        if (checkDuplicates(playlist, idx)) {
            alert("Sorry, Your playlist already have this track")
        } else {
            setPlaylist([tracks.items[idx], ...playlist])
        }
    }

    const removeItemFromPlaylist = (idx) => {
        setPlaylist(playlist.filter((item, index) => index !== idx))
    }


    const createPlaylist = (title) => {
        const uris = playlist.map(el => el.uri)
        SpotifyApi.me()
            .then(user => {
                SpotifyApi.createPlaylist(title, user.data.id)
                    .then(res => {
                        SpotifyApi.addItemsTracks(res.data.id, uris)
                            .then(res => {
                                alert(`Playlist ${title} Successfuly created`)
                                SpotifyApi.getUsersPlaylists(user.data.id)
                                    .then(res => {
                                        console.log(res)
                                        setPlaylist([])
                                    })
                            })
                            .catch(err => {
                                if (err.status === 400) {
                                }
                            })

                    })
            })

    }


    return (
        <div className="App">
            <h1>Jammming</h1>
            <SearchBar getQuery={setData} onButtonPress={setKeypressData}/>
            <div className={styles.main}>

                {tracks.items.length > 0 &&
                <div>
                    <SearchResults title={"Results"} tracks={tracks} loading={loading} addToPlaylist={updatePlaylist}/>
                    <div className={styles.pagination}>
                        <Button onClick={moveToPrevious} disabled={tracks.previous === null}>{"<"}</Button>
                        <span>{tracks.offset ? Math.ceil(tracks.offset / 20) + 1 : 1}</span>
                        <Button onClick={moveToNext} disabled={tracks.next === null}>{">"}</Button>
                    </div>
                </div>
                }
                <div>
                    {playlist.length > 0 &&
                    <Playlist tracks={playlist} removeItem={removeItemFromPlaylist}
                              createPlaylist={createPlaylist}/>}
                </div>
            </div>

        </div>
    );
};

export default Main;