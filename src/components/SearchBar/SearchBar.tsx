import * as React from 'react';
import TextField from '@mui/material/TextField';
import styles from './SearchBar.module.css';
import {Button} from "@mui/material"; // Import the CSS module



type OptType = {
    options: string[]
}

export const SearchBar = ({options}: OptType) => {
    return(
        <div className={styles.main}>
            <TextField color="inherit" className={styles.inputField} id="outlined-basic" label="Search song" variant="outlined"/>
            <Button className={styles.button} color="inherit" type="button" variant="outlined">Search</Button>
        </div>

    )

}