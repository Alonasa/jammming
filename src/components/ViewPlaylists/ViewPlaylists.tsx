import React, {useEffect, useState} from 'react';
import {SpotifyApi} from "../../api/spotify-api.ts";
import {Box, Card, CardContent, CardMedia, IconButton, useTheme} from "@mui/material";
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import styles from "./ViewPlaylists.module.css"
import {Playlist} from "../Playlist/Playlist.tsx";


const ViewPlaylists = () => {
    let [user, setUser] = useState("")
    let [playlists, setPlaylists] = useState([])
    let [playlistItems, setPlaylistItems] = useState([])
    const getData = () => {
        SpotifyApi.me()
            .then(user => {
                setUser(user.data.id)
                SpotifyApi.getUsersPlaylists(user.data.id)
                    .then(res => {
                        console.log(res)
                        setPlaylists(res.data.items)

                        console.log(res.data.items[0].images[0].url)
                    })

            })
    }

    useEffect(() => {
        getData()
    }, [])

    const onClickHandler = (id) => {
        console.log(id)
        SpotifyApi.getUsersPlaylists(id)
            .then(res => {
                console.log(res)
                // setPlaylistItems(res.data.items)

            })
    }

    const createPlaylist = () => {
        console.log("create")
    }

    const removeItemFromPlaylist = () => {

    }


    return (
        <div>
            <div className={styles.playlistsContainer}>
                {playlists?.map(el => {
                    return (
                        <Card key={el.id} sx={{display: 'flex', justifyContent: "space-between", marginBottom: "20px"}}
                              onClick={()=>onClickHandler(el.id)}>
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <CardContent sx={{flex: '1 0 auto'}}>
                                    <Typography component="div" variant="h5">
                                        {el.name}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        sx={{color: 'text.secondary'}}
                                    >
                                        {el.owner.display_name}
                                    </Typography>
                                    <Typography>
                                        {el.description.length > 0 && el.description}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{width: 151}}
                                image={el.images?.[0]?.url}
                                alt={el.name + " cover image"}
                            />
                        </Card>
                    )
                })

                }
            </div>
            {playlistItems.length > 0 &&
            <Playlist tracks={playlistItems} removeItem={removeItemFromPlaylist}
                      createPlaylist={createPlaylist}/>
            }
        </div>
    );
};

export default ViewPlaylists;