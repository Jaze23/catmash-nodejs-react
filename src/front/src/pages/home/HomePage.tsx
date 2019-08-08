import React, { Fragment, useMemo, useState, useEffect } from "react";
import { useStore } from "../../common/config/state/Store";
import { makeStyles } from "@material-ui/styles";
import { Theme, createStyles, Grid, Typography } from "@material-ui/core";
import { ICat } from "./interfaces/ICat.interface";
import CatBlock from "./components/CatBlock";
import DIContainer from "../../common/config/di-container";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { CatService } from "../../common/services/cat.service";
import { GlobalHelperActionType } from "../../common/enums";
import { GlobalHelper } from "../../common/models/global-helper.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    homePage: {
      flex: 1,
      color: "white",
      width: "100%",
      height: "100%"
    },
    title: {
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "10px",
    },
    blocks: {
      height: '100%',
    }
  }),
);

export default function HomePage() {
  const classes = useStyles();
  const { state, dispatch } = useStore();
  const [cats, setCats] = useState([] as ICat[]);
  const [errorMessage, setErrorMessage] = useState("");
  const [shouldGetNewCats, setShouldGetNewCats] = useState(true);
  const catService = DIContainer.resolve<CatService>(CatService);

  async function vote(_id: string) {
    try {
      await catService.vote(_id);
      setShouldGetNewCats(true);
    } catch (e) {
      // toastr
    }
  }

  useEffect(() => {
    if (shouldGetNewCats) {
      (async () => {
        try {
          dispatch({
            type: GlobalHelperActionType.ShowSpinner,
            payload: { showSpinner: true } as GlobalHelper,
          });
          const cats = await catService.getVersus();
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
        setShouldGetNewCats(false);
      })();
    }
  }, [shouldGetNewCats]);

  return useMemo(() => {
    return (
      <Grid item xs={12} className={classes.homePage}>
        <Typography variant="h6" className={classes.title}>
          Vote for the cutest cat !
        </Typography>
        {errorMessage && (
          <p>
            <ErrorOutlineIcon />
          </p>
        )}

        {!state.globalHelper.showSpinner && (
          <Grid className={classes.blocks} spacing={3} container direction="row" justify="center" alignItems="center">
            {cats.map((cat) => (
              <CatBlock key={cat.id} {...{ ...cat, vote }} />
            ))}
          </Grid>
        )}
      </Grid>
    );
  }, [cats, errorMessage, state.globalHelper.showSpinner]);
}
