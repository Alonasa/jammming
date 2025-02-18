import React from "react";
import {CardItem} from "../CardItem/CardItem.tsx";
import {CircularProgress} from "@mui/material";
import {ListItem} from "../ListItem/ListItem.tsx";

type TracksType = {
    name: string,
    artists: Array<{ name: string }>
    id: string
}

type SearchResultsType = {
    title: string,
    tracks: any
    loading: boolean
    addToPlaylist: (index: number)=> void
}

export const SearchResults = (props: SearchResultsType) => {
    let {title, tracks, loading, addToPlaylist} = props;
    const logged = (idx) => {
        addToPlaylist(idx)

    }
    return (
        <CardItem>
            <h2>{title}</h2>
            {loading && <CircularProgress color={"wheat"} sx={{margin: "20px auto"}}/>}
            {tracks.items?.map((el, idx) => {
                return (
                    <ListItem key={idx} artist={el.artists[0].name} title={el.name} callback={()=>logged(idx)} sign={"+"}/>
                )
            })}
        </CardItem>

    )
}