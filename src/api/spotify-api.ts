import axios, {AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults} from "axios";
import qs from 'qs';

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const URL = 'https://api.spotify.com/v1';
let TOKEN = '';

export const setToken = (token: string) => {
    TOKEN = token;
    console.log(TOKEN)
};

//@ts-ignore
const apiClient: AxiosInstance = axios.create({
    baseURL: URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('spotify_token')}`,
    },
});


export const getToken = () => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const codeValue = params.get('code');
    console.log(codeValue)

    const data = qs.stringify({
        grant_type: 'authorization_code',
        code: codeValue,
        redirect_uri: REDIRECT_URI, // Ensure this matches exactly with your registered URI
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    });

    axios.post('https://accounts.spotify.com/api/token', data, {

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then(res => {
            console.log(res.data)
            localStorage.setItem('spotify_token', res.data.access_token)
            setToken(res.data.access_token)

        })
}


export const SpotifyApi = {
    getTracks(query) {
        return apiClient.get(`/search?q=${query}&type=track`);
    }
}