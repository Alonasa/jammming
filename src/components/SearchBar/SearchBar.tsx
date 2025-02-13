import * as React from 'react';
import TextField from '@mui/material/TextField';
import styles from './SearchBar.module.css';
import {Button} from "@mui/material";
import {ChangeEvent, useState} from "react";

type SearchBarType = {
    getQuery: (query:string)=>void
}


export const SearchBar = (props: SearchBarType) => {
    const {getQuery} = props
    const [value, setValue] = useState('');

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onSubmitHandler = ()=> {
        getQuery(value)
    }


    return (
        <div className={styles.main}>
            <TextField value={value} onChange={onChangeHandler} color="inherit" className={styles.inputField}
                       id="outlined-basic" label="Search song" variant="outlined"/>
            <Button onClick={onSubmitHandler} className={styles.button} color="inherit" type="button" variant="outlined">Search</Button>
        </div>

    )

}