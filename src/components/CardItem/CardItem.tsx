import React from 'react';
import {Card} from "@mui/material";
import styles from "./CardItem.module.css";

export const CardItem = ({children}) => {
    return(
        <Card className={styles.card} sx={{width: "100%", backgroundColor: "inherit", color: "inherit"}}>
            {children}
        </Card>
    );
};
