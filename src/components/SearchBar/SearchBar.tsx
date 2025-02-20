import * as React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import styles from './SearchBar.module.css';
import ButtonBig from "../ButtonBig/ButtonBig.tsx";

type SearchBarType = {
    getQuery: (query: string) => void
    onButtonPress: (e: KeyboardEvent<HTMLDivElement>, query: string) => void
}


export const SearchBar = (props: SearchBarType) => {
    const {getQuery, onButtonPress} = props
    const [value, setValue] = useState('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onClickHandler = () => {
        if (value.length > 0) {
            getQuery(value)
        } else {
            alert("You Can't Search for Empty String")
        }
    }


    return (
        <div className={styles.main}>
            <TextField value={value} onChange={onChangeHandler} onKeyDown={(e) => onButtonPress(e, value)}
                       color="inherit" className={styles.inputField}
                       id="outlined-basic" label="Search song" variant="outlined"/>
            <ButtonBig onClick={onClickHandler} title={"Search"} isDisabled={value.length <= 0}/>
        </div>

    )

}