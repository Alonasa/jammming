import axios, {AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults} from "axios";
import qs from 'qs';

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI.toString();
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
export const SCOPES = "user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative";
const AUTH_URL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
const URL = 'https://api.spotify.com/v1';



const retrieveLSValue = (key) => {
    return localStorage.getItem(key)
}

const header = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('spotify_token')}`,
        "Content-Type":"application/json"
    }
}


//@ts-ignore
const apiClient: AxiosInstance = axios.create({
    baseURL: URL,
    headers: {
        'Authorization': `Bearer ${retrieveLSValue('spotify_token')}`,
    },
});


const getTokenValue = () => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const codeValue = params.get('code');
    return codeValue
}


const checkToken = () => {
    let codeValue = getTokenValue();

    if(codeValue !== null){
        return codeValue
    }else{
        window.location.href = AUTH_URL;
    }
}



export const getToken = () => {
    let authorization
    let codeValue = checkToken();

    authorization = qs.stringify({
        grant_type: 'authorization_code',
        code: codeValue,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    });


    axios.post('https://accounts.spotify.com/api/token', authorization, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => {
            localStorage.setItem('spotify_token', res.data.access_token)
            localStorage.setItem('refresh_token', res.data.refresh_token)
        })
        .catch(err=>{
            // console.log(err)
        })
}


export const refreshToken = () => {
    let authorization = qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: retrieveLSValue('refresh_token'),
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    })

    axios.post('https://accounts.spotify.com/api/token', authorization, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => {
            localStorage.setItem('spotify_token', res.data.access_token)
            localStorage.setItem('refresh_token', res.data.refresh_token)
        })
}


export const SpotifyApi = {
    me() {
        return apiClient.get('/me')
    },
    getTracks(query) {
        return apiClient.get(`/search?q=${query}&type=track`);
    },
    moveThroughList(link) {
        return axios.get(link, header)
    },
    createPlaylist(title, user_id) {
        return axios.post(`https://api.spotify.com/v1/users/${user_id}/playlists
`,{"name": title}, header)
    },
    addItemsTracks(playlist_id: string, uris: String[]) {
        return apiClient.post(`/playlists/${playlist_id}/tracks`, {uris})
    },
    getUsersPlaylists(user_id) {
        return apiClient.get(`/users/${user_id}/playlists`)
    }
}