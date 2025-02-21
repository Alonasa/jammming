import * as React from "react";
import {Button} from "@mui/material";
import styles from "./ListItem.module.css";


type ListItemType = {
    artist: string,
    title: string,
    sign: string,
    isEdit: boolean
    external_urls: {spotify: string},
    callback: () => void
}

export const ListItem = (props: ListItemType) => {
    let {artist, title, callback, sign, isEdit} = props;
    return (
        <div className={styles.item}>
            <div>
                <h3>{artist}</h3>
                <p>{title}</p>
            </div>
            {isEdit&&<Button onClick={callback} type="button" color="inherit" variant="outlined" aria-label="Add to playlist"
                             size="small">{sign}</Button>}
        </div>
    )
}