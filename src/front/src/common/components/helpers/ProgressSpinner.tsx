import React from "react";
import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progress: {
            width: '64px',
            height: '64px',
            color: 'white',
            position: 'absolute',
            top: '50%',
            left: '50%',
            margin: '-32px 0 0 -32px'
        }
    }),
);

export function ProgressSpinner() {
    const classes = useStyles();

    return (
        <CircularProgress size="1" className={classes.progress} color="primary" disableShrink />
    )
} 