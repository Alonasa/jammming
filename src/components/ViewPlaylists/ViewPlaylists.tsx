import React, {useEffect, useState} from 'react';
import {SpotifyApi} from "../../api/spotify-api.ts";
import {Box, Card, CardContent, CardMedia, IconButton} from "@mui/material";
import Typography from '@mui/material/Typography';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddIcon from '@mui/icons-material/Add';
import styles from "./ViewPlaylists.module.css"
import {Playlist} from "../Playlist/Playlist.tsx";
import SnackbarCustom from "../Snackbar/SnackbarCustom.tsx";
import UpdateTracks from "../UpdateTracks/UpdateTracks.tsx";
import {useNavigate} from "react-router-dom";


type TrackType = {
    uri: string
}

export type DeleteBodyType = {
    tracks: TrackType[]
}

type ExternalUrls = {
    spotify: string;
};

type User = {
    display_name: string;
    external_urls: ExternalUrls;
    id: string;
    type: string;
    uri: string;
};

type Image = {
    url: string;
};

type Tracks = {
    href: string;
    total: number;
};

type PlaylistType = {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: User;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
};


type TrackAlbum = {
    available_markets: string[];
    album_type: string;
    href: string;
    id: string;
    images: Array<{ height: number; url: string; width: number }>;
    name: string;
    release_date: string;
    release_date_precision: string;
    uri: string;
    artists: Array<{
        external_urls: ExternalUrls;
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
    }>;
    total_tracks: number;
};

type TrackArtist = {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
};


type Track = {
    added_at: string;
    added_by: User;
    is_local: boolean;
    primary_color: string | null;
    track: {
        preview_url: string | null;
        available_markets: string[];
        explicit: boolean;
        type: string;
        episode: boolean;
        track: boolean;
        album: TrackAlbum;
        artists: TrackArtist[];
        disc_number: number;
        track_number: number;
        duration_ms: number;
        external_ids: { isrc: string };
        external_urls: ExternalUrls;
        href: string;
        id: string;
        name: string;
        popularity: number;
        uri: string;
        is_local: boolean;
    };
    video_thumbnail: { url: string | null };
};

export type UpdateTracksType = {
    "uris": string[]
}

export const generateMessage = (message: string) => {
    return [...`${message}`, Math.random().toFixed(2)].join('')
}


const ViewPlaylists = () => {
    const navigate = useNavigate();
    let [playlists, setPlaylists] = useState<PlaylistType[]>([]);
    let [playlistItems, setPlaylistItems] = useState<TrackType[]>([]);
    let [title, setTitle] = useState<string>('');
    let [playlistId, setPlaylistId] = useState<string>('');
    let [refreshKey, setRefreshKey] = useState<number>(0);
    let [message, setMessage] = useState<string>("");
    let [isEdit, setIsEdit] = useState<boolean>(false);

    const updateRefreshKey = () => {
        setRefreshKey(prevKey => prevKey + 1)
    }

    const getData = () => {
        SpotifyApi.me()
            .then(user => {
                SpotifyApi.getUsersPlaylists(user.data.id)
                    .then(res => {
                        setPlaylists(res.data.items)
                    })

            })
    }

    useEffect(() => {
        getData()
    }, [refreshKey, playlistItems])

    const showItemsHandler = (playlistId: string, name?: string) => {
        SpotifyApi.getPlaylistItems(playlistId)
            .then(res => {
                setPlaylistItems([])
                const newItems = res.data.items.map(el => el.track);
                setTitle(name)
                setPlaylistId(playlistId)
                setPlaylistItems(prevItems => [...prevItems, ...newItems]);
            })
    }


    const deleteItemHandler = (trackId: string, title: string) => {
        let trackUri = playlistItems[trackId].uri
        SpotifyApi.deleteItem(playlistId, {tracks: [{uri: trackUri}]})
            .then(res => {
                setMessage(generateMessage("Track deleted from your playlist"))
                updateRefreshKey()
                showItemsHandler(playlistId, title)
            })
    }


    const updatePlaylistHandler = (newTitle: string) => {
        if (newTitle !== title) {
            SpotifyApi.updatePlaylist(playlistId, newTitle)
                .then(res => {
                    updateRefreshKey()
                    setTitle(newTitle)
                    setMessage(generateMessage("Title was updated"))
                    navigate("/")

                })
        }else {
            updatePlaylistItemsHandler()
            setNewTracks({uris: []})
            setPlaylistItems([])
            navigate("/")
        }
    }


    const deletePlaylistHandler = (playlistId: string) => {
        SpotifyApi.deletePlaylist(playlistId)
            .then(res => {
                setPlaylistItems([])
                setMessage(generateMessage("Playlist deleted"))
                updateRefreshKey()
            })

    }

    const updateIdHandler = (playlistId: string) => {
        setIsEdit(true)
    }

    let [newTracks, setNewTracks] = useState<UpdateTracksType>()

    const getTracksHandler = (tracks: UpdateTracksType) => {
        setNewTracks(tracks)
    }

    const updatePlaylistItemsHandler = () => {
        SpotifyApi.updatePlaylistTracks(playlistId, newTracks)
            .then(res => {
            })
        setMessage(generateMessage("Tracks is updated"))
    }


    return (
        <div className={styles.playlistsWrapper}>
            <div className={styles.playlistsContainer}>
                {isEdit ? (<UpdateTracks playlist={playlistItems} setPlaylist={setPlaylistItems} isEdit={true}
                                         updateTracks={getTracksHandler}/>) :
                    (playlists?.map(el => {
                        return (
                            <Card key={el.id}
                                  sx={{display: 'flex', justifyContent: "space-between", marginBottom: "20px"}}
                                  onClick={() => showItemsHandler(el.id, el.name)}>
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
                                <Box sx={{position: "relative"}}>
                                    <CardMedia
                                        component="img"
                                        sx={{width: 151}}
                                        image={el.images?.[0]?.url}
                                        alt={el.name + " cover image"}
                                    />
                                    <IconButton onClick={() => deletePlaylistHandler(el.id)} style={{
                                        position: "absolute",
                                        right: 0,
                                        top: 0,
                                        borderRadius: "50%",
                                        color: "wheat",
                                        backgroundColor: "rgb(230 30 30 / 70%)"
                                    }} aria-label="delete-playlist">
                                        <CloseOutlinedIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => updateIdHandler(el.id)} style={{
                                        position: "absolute",
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: "rgb(28 170 79 / 70%)",
                                        color: "wheat",
                                        width: 40,
                                        height: 40
                                    }} aria-label="add-items">
                                        <AddIcon/>
                                    </IconButton>
                                </Box>
                            </Card>
                        )
                    }))
                }
            </div>
            {message && <SnackbarCustom message={message}/>}
            <div className={styles.playlistBody}>
                {playlistItems.length > 0 && isEdit ?
                    <Playlist currentTitle={title} tracks={playlistItems} removeItem={deleteItemHandler}
                              createPlaylist={updatePlaylistHandler} isEdit={isEdit}/>
                    : playlistItems.length > 0 &&
                    <Playlist currentTitle={title} tracks={playlistItems} isEdit={isEdit}/>
                }
            </div>
        </div>
    );
};

export default ViewPlaylists;