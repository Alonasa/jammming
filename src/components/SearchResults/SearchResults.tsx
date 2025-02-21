import React, {useState} from "react";
import {CardItem} from "../CardItem/CardItem.tsx";
import {CircularProgress} from "@mui/material";
import {ListItem} from "../ListItem/ListItem.tsx";
import {generateMessage} from "../ViewPlaylists/ViewPlaylists.tsx";
import SnackbarCustom from "../Snackbar/SnackbarCustom.tsx";

type TracksType = {
    name: string,
    artists: { name: string }[]
    id: string
}

type SearchResultsType = {
    title: string,
    tracks: TracksType
    loading: boolean
    addToPlaylist: (index: number) => void
}

export const SearchResults = (props: SearchResultsType) => {
    let {title, tracks, loading, addToPlaylist, isEdit} = props;
    let [message, setMessage] = useState<string>("")
    const logged = (idx) => {
        addToPlaylist(idx)
        setMessage(generateMessage("Track added"))

    }
    return (
        <CardItem>
            <h2>{title}</h2>
            {loading && <CircularProgress color={"wheat"} sx={{margin: "20px auto"}}/>}
            {tracks.items?.map((el, idx) => {
                return (
                    <ListItem key={idx} artist={el.artists[0].name} title={el.name} callback={() => logged(idx)}
                              sign={"+"} isEdit={isEdit}/>
                )
            })}
            {message&&<SnackbarCustom message={message}/>}

        </CardItem>

    )
}