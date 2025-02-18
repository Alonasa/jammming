import React, {useState} from "react";
import {CardItem} from "../CardItem/CardItem.tsx";
import {Button, CircularProgress, Input, TextField} from "@mui/material";
import {ListItem} from "../ListItem/ListItem.tsx";
import ButtonBig from "../ButtonBig/ButtonBig.tsx";

type TracksType = {
    name: string,
    artists: Array<{ name: string }>
    id: string
}

type SearchResultsType = {
    tracks: Array<TracksType>,
    removeItem: (idx: number) => void
    createPlaylist: (title: string) => void
}

export const Playlist = (props: SearchResultsType) => {
    let {tracks, removeItem, createPlaylist} = props;
    let [title, setTitle] = useState("");

    const onClickHandler = async () => {
        let res = await createPlaylist(title)
        if(res){
            setTitle("")
        }
    }

    const onChangeHandler = (e) => {
        let currentValue = e.currentTarget.value
        let newTitle = currentValue.charAt(0).toUpperCase() + currentValue.slice(1)
        setTitle(newTitle)
    }

    const removeTrackHandler = (id) => {
        removeItem(id)
    }

    return (
        <CardItem>
            <Input value={title} onChange={onChangeHandler}
                   style={{margin: "25px 25px 0 25px", color: "wheat", fontWeight: "bold", fontSize: "25px"}}
                   color={"wheat"} placeholder="Add your playlist title"
                   required/>
            {tracks?.map((el, idx) => {
                return (
                    <ListItem key={el.id} artist={el.artists[0].name} title={el.name}
                              callback={() => removeTrackHandler(idx)} sign={"-"}/>
                )
            })}
            <ButtonBig style={{margin: "25px 30px"}} title={"Save playlist"} onClick={onClickHandler} isDisabled={title.length <= 0}/>
        </CardItem>

    )
}