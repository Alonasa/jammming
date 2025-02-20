import axios, {AxiosInstance} from "axios";
import qs from 'qs';
import {DeleteBodyType} from "../components/ViewPlaylists/ViewPlaylists";

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI.toString();
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
export const SCOPES = "user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative app-remote-control user-read-playback-state user-modify-playback-state";
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

}


export const refreshAccessToken = () => {
    let authorization = qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: retrieveLSValue('refresh_token'),
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    })

    return axios.post('https://accounts.spotify.com/api/token', authorization, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(res => {
            localStorage.setItem('spotify_token', res.data.access_token);
            if (res.data.refresh_token) {
                localStorage.setItem('refresh_token', res.data.refresh_token);
            }
            return res.data.access_token;
        })
        .catch(error => {
            console.error('Error refreshing access token:', error);
            throw error;
        });
}


apiClient.interceptors.response.use(
    response => response,
    originalError => {
        const originalRequest = originalError.config;

        if (originalError.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return refreshAccessToken().then(newAccessToken => {
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            });
        }

        return Promise.reject(originalError);
    }
);



export const SpotifyApi = {
    me() {
        return apiClient.get('/me')
    },
    getTracks(query:string) {
        return apiClient.get(`/search?q=${query}&type=track`);
    },
    moveThroughList(link:string) {
        return axios.get(link, header)
    },
    createPlaylist(title:string, user_id:string) {
        return axios.post(`https://api.spotify.com/v1/users/${user_id}/playlists
`,{"name": title}, header)
    },
    addItemsTracks(playlist_id: string, uris: String[]) {
        return apiClient.post(`/playlists/${playlist_id}/tracks`, {uris})
    },
    getUsersPlaylists(user_id:string) {
        return apiClient.get(`/users/${user_id}/playlists`)
    },
    getPlaylistItems(playlist_id:string){
        return apiClient.get(`/playlists/${playlist_id}/tracks`)
    },
    updatePlaylist(playlist_id:string, title){
        return apiClient.put(`/playlists/${playlist_id}`,{name: title})
    },
    deleteItem(playlist_id: string, data: DeleteBodyType){
        return apiClient.delete(`/playlists/${playlist_id}/tracks`, {data})
    },
    deletePlaylist(playlist_id: string){
        return apiClient.delete(`playlists/${playlist_id}/followers`)
    }
}