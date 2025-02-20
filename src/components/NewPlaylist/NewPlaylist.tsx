import React, {KeyboardEvent, useState} from 'react';
import {SpotifyApi} from "../../api/spotify-api.ts";
import {SearchBar} from "../SearchBar/SearchBar.tsx";
import {SearchResults} from "../SearchResults/SearchResults.tsx";
import {Button} from "@mui/material";
import {Playlist} from "../Playlist/Playlist.tsx";
import styles from "./NewPlaylist.module.css"
import {useNavigate} from "react-router-dom";
import SnackbarCustom from "../Snackbar/SnackbarCustom.tsx";

const NewPlaylist = () => {
    const navigate = useNavigate();
    let [tracks, setTracks] = useState({
        items: []
    });
    let [loading, setLoading] = useState(false);
    let [playlist, setPlaylist] = useState([]);
    let [message, setMessage] = useState<string>("")

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
            setMessage("Sorry, Your playlist already have this track")
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
                                setMessage(`Playlist ${title} Successfuly created`)
                                setPlaylist([])
                                navigate("/view")
                            })
                            .catch(err => {
                                if (err.status === 400) {
                                }
                            })

                    })
            })

    }


    return (
        <div>
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
                              createPlaylist={createPlaylist} currentTitle={"Playlist Title"}/>}
                    {message&&<SnackbarCustom message={message}/>}
                </div>
            </div>

        </div>
    );
};

export default NewPlaylist;