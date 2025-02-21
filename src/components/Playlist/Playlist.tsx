import React, {useEffect, useState} from "react";
import {CardItem} from "../CardItem/CardItem.tsx";
import {Input, TextField} from "@mui/material";
import {ListItem} from "../ListItem/ListItem.tsx";
import ButtonBig from "../ButtonBig/ButtonBig.tsx";

type TracksType = {
    name: string,
    artists: Array<{ name: string }>
    id: string
}

type SearchResultsType = {
    currentTitle: string
    tracks: Array<TracksType>,
    isEdit?: boolean
    removeItem?: (idx: number, title: string) => void
    createPlaylist?: (title: string) => void
}

export const Playlist = (props: SearchResultsType) => {
    let {currentTitle, tracks, removeItem, createPlaylist, isEdit} = props;
    let [title, setTitle] = useState("");

    useEffect(() => {
        setTitle(currentTitle);
    }, [currentTitle, tracks]);

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
        removeItem(id, currentTitle)
    }

    return (
        <CardItem style={{width: "45%"}}>
            {isEdit?<Input value={title} onChange={onChangeHandler}
                   style={{margin: "25px 25px 0 25px", color: "wheat", fontWeight: "bold", fontSize: "25px"}}
                   color={"wheat"} placeholder="Add your playlist title"
                   required/>:<h3 style={{margin: "25px 20px 25px", color: "wheat", fontWeight: "bold", fontSize: "25px"}}>{title}</h3>}
            {tracks?.map((el, idx) => {
                return (
                    <ListItem key={el.id} artist={el.artists[0].name} title={el.name}
                              callback={() => removeTrackHandler(idx)} sign={"-"} isEdit={isEdit}/>
                )
            })}
            {isEdit&&<ButtonBig style={{margin: "25px 30px"}} title={"Save playlist"} onClick={onClickHandler} isDisabled={title.length < 1}/>}
        </CardItem>

    )
}