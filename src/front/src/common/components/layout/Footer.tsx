import React, { useMemo } from "react";
import githubIcon from "../../../github.svg";
import {
  makeStyles,
  createStyles,
  Theme,
  Grid,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      background: "black",
      height: "50px",
      position: "fixed",
      color: "white",
      bottom: 0,
      width: "100%",
    },
    title: {
      fontWeight: "bold",
    },
    logo: {
      cursor: "pointer",
      width: "2%",
      float: "right",
      marginRight: theme.spacing(2),
    },
  }),
);

export default function Footer() {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.footer}>
      <Typography variant="body1" className={classes.title}>
        <a target="_blank" href="https://github.com/Jaze23">
          <img src={githubIcon} className={classes.logo} />
        </a>
      </Typography>
    </Grid>
  );
}
