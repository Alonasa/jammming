import React from "react";
import {CardItem} from "../CardItem/CardItem.tsx";
import {CircularProgress, Input, TextField} from "@mui/material";
import {ListItem} from "../ListItem/ListItem.tsx";

type TracksType = {
    name: string,
    artists: Array<{ name: string }>
    id: string
}

type SearchResultsType = {
    title: string,
    tracks: Array<TracksType>
}

export const Playlist = (props: SearchResultsType) => {
    let {title, tracks} = props;
    const logged = () => {
        console.log("Button clicked")
    }
    return (
        <CardItem>
            <Input style={{margin: "0 20px", color: "wheat"}} color={"wheat"} placeholder="Add your playlist title"
                   required/>
            {tracks?.map(el => {
                return (
                    <ListItem key={el.id} artist={el.artists[0].name} title={el.name} callback={logged}/>
                )
            })}
        </CardItem>

    )
}