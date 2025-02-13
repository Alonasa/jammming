import './App.css';
import {useState} from "react";
import {v4} from "uuid";
import styles from "./App.module.css"
import {SearchBar} from "./components/SearchBar/SearchBar.tsx";
import {SearchResults} from "./components/SearchResults/SearchResults.tsx";

function App() {
    let [tracks, setTracks] = useState([{name: "Diamonds", id:v4(), artists: [{name:"Rihanna"}]}, {name: "Diam",id:v4(), artists: [{name:"Hanna"}]}])
    let [loading, setLoading] = useState(false)
    const getTracks = (query) => {
      console.log(query)
    }

    return (
        <div className="App">
            <h1>Jammming</h1>
            <SearchBar getQuery={getTracks}/>
            <div className={styles.main}>
                <SearchResults title={"Results"} tracks={tracks} loading={loading}/>
            </div>
        </div>
    );
}

export default App;
