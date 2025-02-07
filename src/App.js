import './App.css';
import {useState} from "react";
import {v4} from "uuid";
import {SearchBar} from "./components/SearchBar/SearchBar.tsx";

function App() {
    let options = ["hello", "bye"]
    return (
        <div className="App">
            <h1>Jammming</h1>
            <SearchBar options={options}/>
        </div>
    );
}

export default App;
