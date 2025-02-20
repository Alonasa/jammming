import React, {useEffect} from 'react';
import {getToken} from "../../api/spotify-api.ts";
import {Link} from "react-router-dom";
import ButtonBig from "../ButtonBig/ButtonBig.tsx";
import styles from "./Main.module.css"

const Main = () => {
    useEffect(() => {
        getToken()
    }, []);


    return (
        <div className={styles.container}>
            <Link className={styles.button} to={"/create"}><ButtonBig title={"Create Playlist"}/></Link>
            <Link className={styles.button} to={"/view"}><ButtonBig title={"View Playlists"}/></Link>
        </div>
    );
};

export default Main;