import React, {useEffect, useState} from 'react';
import {Alert, Box, IconButton, Snackbar} from "@mui/material";
import {SnackbarCloseReason} from "@mui/material/Snackbar/useSnackbar.types";
import CloseIcon from '@mui/icons-material/Close';


export type SnackbarMessage = {
    message: string;
    key: number;
}

const SnackbarCustom = ({ message }: { message: string }) => {
    console.log(message)
    const [open, setOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
        undefined,
    );

    useEffect(() => {
        if (message) {
            setMessageInfo({message, key: new Date().getTime()});
            setOpen(true);
        }
    }, [message]);


    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessageInfo(undefined)
        setOpen(false);
    };

    const handleExited = () => {
        setMessageInfo(undefined);
    };

    return (
        <Snackbar
            key={messageInfo ? messageInfo.key : undefined}
            open={open}
            autoHideDuration={5000}
            TransitionProps={{ onExited: handleExited }}
            onClose={handleClose}
            message={messageInfo ? messageInfo.message : undefined}
            color={"wheat"}
            style={{backgroundColor: "green", color: "green"}}
            action={
                <>
                    <IconButton
                        aria-label="close"
                        sx={{p: 0.5, backgroundColor: "green", color: "inherit"}}
                        onClick={handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                </>
            }
        >
            <Alert variant="filled" severity="success">{messageInfo && messageInfo.message.slice(0, -4)}</Alert>

        </Snackbar>
    );
};

export default SnackbarCustom;