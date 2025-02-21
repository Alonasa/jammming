import React, {KeyboardEvent, useState} from 'react';
import {SpotifyApi} from "../../api/spotify-api.ts";
import {generateMessage, UpdateTracksType} from "../ViewPlaylists/ViewPlaylists.tsx";
import {SearchResults} from "../SearchResults/SearchResults.tsx";
import {Button} from "@mui/material";
import {SearchBar} from "../SearchBar/SearchBar.tsx";
import SnackbarCustom from "../Snackbar/SnackbarCustom.tsx";
import styles from "./UpdateTracks.module.css"

const UpdateTracks = (props) => {
    let {playlist, setPlaylist, isEdit, updateTracks} = props;

    let [loading, setLoading] = useState(false);
    let [message, setMessage] = useState<string>("")
    let [tracks, setTracks] = useState({
        items: []
    });

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


    const [newItems, setNewItems] = useState([]);

    const updatePlaylist = (idx) => {
        if (checkDuplicates(playlist, idx)) {
            setMessage(generateMessage("Sorry, Your playlist already have this track"))
        } else {
            setPlaylist([tracks.items[idx], ...playlist])
            setNewItems([tracks.items[idx].uri, ...newItems])
            let newTracks: UpdateTracksType = {"uris": newItems}
            if (isEdit) {
                updateTracks(newTracks)
            }
        }
    }

    return (
        <>
            <div className={styles.main}>
                <SearchBar getQuery={setData} onButtonPress={setKeypressData}/>
                {tracks.items.length > 0 &&
                <>
                    <SearchResults title={"Results"} tracks={tracks} loading={loading} addToPlaylist={updatePlaylist}
                                   isEdit={true}/>
                    <div className={styles.pagination}>
                        <Button onClick={moveToPrevious} disabled={tracks.previous === null}>{"<"}</Button>
                        <span>{tracks.offset ? Math.ceil(tracks.offset / 20) + 1 : 1}</span>
                        <Button onClick={moveToNext} disabled={tracks.next === null}>{">"}</Button>
                    </div>
                </>
                }
                {message && <SnackbarCustom message={message}/>}
            </div>

        </>
    );
};

export default UpdateTracks;