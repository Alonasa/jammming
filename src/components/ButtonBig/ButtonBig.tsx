import * as React from "react";
import {Button} from "@mui/material";
import styles from "./ButtonBig.module.css"

type ButtonType = {
    title: string
    onClick: () => void
    className?: string
    style?: string
    isDisabled?: boolean
}

const ButtonBig = (props: ButtonType) => {
    let {title, onClick, className, style, isDisabled} = props
    return (
        <Button style={style} onClick={onClick} className={className ? className : styles.button} color="inherit" type="button"
                variant="outlined" disabled={isDisabled}>{title}</Button>
    );
};

export default ButtonBig;