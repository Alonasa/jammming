import * as React from "react";
import {Button} from "@mui/material";
import styles from "./ListItem.module.css";


type ListItemType = {
    artist: string,
    title: string,
    callback: () => void
}

export const ListItem = (props: ListItemType) => {
    let {artist, title, callback} = props;
    return (
        <div className={styles.item}>
            <div>
                <h3>{artist}</h3>
                <p>{title}</p>
            </div>
            <Button onClick={callback} type="button" color="inherit" variant="outlined" aria-label="Add to playlist"
                    size="small">+</Button>
        </div>
    )
}