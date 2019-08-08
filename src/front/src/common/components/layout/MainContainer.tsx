import React, { Fragment, useMemo, Suspense } from "react";
import { useStore } from "../../config/state/Store";
import { makeStyles } from "@material-ui/styles";
import { Theme, createStyles, Grid } from "@material-ui/core";

interface IProps {
  children: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flex: 1,
      padding: "80px",
    },
    progress: {
      width: "64px",
      height: "64px",
      color: "white",
      position: "absolute",
      top: "50%",
      left: "50%",
      margin: "-32px 0 0 -32px"
    }
  })
);

export default function MainContainer(props: IProps) {
  const { children } = props;
  const classes = useStyles();
  const { state } = useStore();

  return useMemo(() => {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        {children}
      </Grid>
    );
  }, []);
}
