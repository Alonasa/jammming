import React from "react";
import {CardItem} from "../CardItem/CardItem.tsx";
import {CircularProgress} from "@mui/material";
import {ListItem} from "../ListItem/ListItem.tsx";

type TracksType = {
    name: string,
    artists: Array<{name:string}>
    id: string
}

type SearchResultsType = {
    title: string,
    tracks: Array<TracksType>
    loading: boolean
}

export const SearchResults = (props: SearchResultsType) => {
    let {title,tracks,loading} = props;
    const logged = () => {
        console.log("Button clicked")
    }
    return (
            <CardItem>
                <h2>{title}</h2>
                {loading&&<CircularProgress color={"wheat"}/>}
                {tracks?.map(el=>{
                    return(
                        <ListItem key={el.id} artist={el.artists[0].name} title={el.name} callback={logged}/>
                    )
                })}
            </CardItem>

    )
}