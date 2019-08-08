import React, { useMemo } from "react";
import { useStore } from "../../config/state/Store";
import logo from "../../../logo.svg";
import {
  AppBar,
  makeStyles,
  createStyles,
  Theme,
  Toolbar,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import useReactRouter from "use-react-router";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      cursor: "pointer",
      margin: "0.5em",
      width: "3%",
      marginRight: theme.spacing(2),
    },
    appBar: {
      background: "#000000",
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      cursor: "pointer",
      fontWeight: "bold",
    },
    link: {
      margin: theme.spacing(1),
      color: "white",
      fontWeight: "bold",
      fontSize: "1.5em"
    },
  }),
);

export default function Header() {
  const classes = useStyles();
  const { state, dispatch } = useStore();
  const { history, location, match } = useReactRouter();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <img
          className={classes.logo}
          src={logo}
          alt="Logo"
          onClick={() => history.push("")}
        />
        <Typography variant="h6" className={classes.title} onClick={() => history.push("")}>
          CatMash
        </Typography>
        <div className={classes.grow} />
        <div>
        <Link component={RouterLink} to="/" className={classes.link}>
            Vote
          </Link>
          <Link component={RouterLink} to="/results" className={classes.link}>
            Results
          </Link>
        </div>
      </Toolbar>
    </AppBar>
    // </div>
  );
}
