import React, {useEffect} from 'react';
import {Button} from "@mui/material";
import {CLIENT_ID, SCOPES, REDIRECT_URI, getToken} from "../../api/spotify-api.ts";
import {Link, useLocation} from "react-router-dom";
import styles from "./Auth.module.css"

const Auth = () => {
    const location = useLocation()
    const AUTH_URL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        console.log(code)

        if (code) {
            getToken(); // Call the function to exchange the code for a token
        }
    }, [location]);

    const handleAuthorize = () => {
        window.location.href = AUTH_URL; // Redirect to Spotify authorization
    };


    return (
        <div className={styles.container}>
            <Button variant={"outlined"} style={{fontWeight: "bold", border: "3px solid", margin: "0 auto"}}
                    color={"success"}>
                <Link to={AUTH_URL} className={styles.AuthButton}>Authorize SPOTIFY</Link>
            </Button>
        </div>
    );
};

export default Auth;