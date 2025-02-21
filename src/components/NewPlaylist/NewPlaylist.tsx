import React, {KeyboardEvent, useEffect, useState} from 'react';
import {SpotifyApi} from "../../api/spotify-api.ts";
import {SearchBar} from "../SearchBar/SearchBar.tsx";
import {SearchResults} from "../SearchResults/SearchResults.tsx";
import {Button} from "@mui/material";
import {Playlist} from "../Playlist/Playlist.tsx";
import styles from "./NewPlaylist.module.css"
import {useNavigate} from "react-router-dom";
import SnackbarCustom from "../Snackbar/SnackbarCustom.tsx";
import {generateMessage} from "../ViewPlaylists/ViewPlaylists.tsx";
import UpdateTracks from "../UpdateTracks/UpdateTracks.tsx";



const NewPlaylist = () => {
    const navigate = useNavigate();
    let [playlist, setPlaylist] = useState([]);
    let [message, setMessage] = useState<string>("")

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
            <div className={styles.main}>
                <UpdateTracks playlist={playlist} setPlaylist={setPlaylist}/>
                <div>
                    {playlist.length > 0 &&
                    <Playlist tracks={playlist} removeItem={removeItemFromPlaylist}
                              createPlaylist={createPlaylist} currentTitle={"Playlist Title"} isEdit={true}/>}
                    {message&&<SnackbarCustom message={message}/>}
                </div>
            </div>

        </div>
    );
};

export default NewPlaylist;