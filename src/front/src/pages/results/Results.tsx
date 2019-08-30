import React, { Fragment, useMemo } from "react";
import { useState, useEffect } from "react";
import { ICat } from "../home/interfaces/ICat.interface";
import DIContainer from "../../common/config/di-container";
import { CatService } from "../../common/services/cat.service";
import { GlobalHelperActionType } from "../../common/enums";
import { GlobalHelper } from "../../common/models/global-helper.model";
import { makeStyles } from "@material-ui/styles";
import {
  Theme,
  createStyles,
  Grid,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useStore } from "../../common/config/state/Store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    vote: {
      flex: 1,
      color: "white",
    },
    title: {
      fontWeight: "bold",
    },
    root: {
      width: "100%",
      overflow: "scroll",
      height: "80vh",
    },
    img: {
      width: "60%",
      borderRadius: "10px",
    },
    cellTitle: {
      fontSize: "1.2em",
    },
  }),
);

export default function Results() {
  const classes = useStyles();

  const { state, dispatch } = useStore();
  const [cats, setCats] = useState([] as ICat[]);
  const [errorMessage, setErrorMessage] = useState("");

  const catService = DIContainer.resolve<CatService>(CatService);
  useEffect(() => {
    (async () => {
      try {
        dispatch({
          type: GlobalHelperActionType.ShowSpinner,
          payload: { showSpinner: true } as GlobalHelper,
        });
        const cats = await catService.getCats();
        setCats(cats);
        dispatch({
          type: GlobalHelperActionType.HideSpinner,
          payload: { showSpinner: false } as GlobalHelper,
        });
      } catch (e) {
        setErrorMessage("Error when retrieving the cats !");
        dispatch({
          type: GlobalHelperActionType.HideSpinner,
          payload: { showSpinner: false } as GlobalHelper,
        });
      }
    })();
  }, []);

  return useMemo(() => {
    return (
      <Grid item xs={4} className={classes.vote}>
        <Typography variant="h6" className={classes.title}>
          Results
        </Typography>
        {errorMessage && (
          <p>
            <ErrorOutlineIcon />
          </p>
        )}
        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cellTitle}>Cat</TableCell>
                <TableCell className={classes.cellTitle} align="center">
                  Position
                </TableCell>
                <TableCell className={classes.cellTitle} align="center">
                  Nbr of Votes
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cats.map((cat, i) => (
                <TableRow key={cat.id}>
                  <TableCell>
                    <img className={classes.img} src={cat.url} />
                  </TableCell>
                  <TableCell align="center">#{i + 1}</TableCell>
                  <TableCell align="center">{cat.votes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    );
  }, [cats, errorMessage]);
}
