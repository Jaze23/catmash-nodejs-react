import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Collapse,
  makeStyles,
  Theme,
  createStyles,
  Button,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DIContainer from "../../../common/config/di-container";
import { CatService } from "../../../common/services/cat.service";
import { green } from "@material-ui/core/colors";

interface IProps {
  _id: string;
  id: string;
  url: string;
  votes: number;
  vote: (_id: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 500,
    },
    media: {
      height: 300,
      position: "relative",
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "absolute",
      bottom: 0,
      left: "50%",
      marginLeft: -50,
    },
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
    rightIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

export default function CatBlock(props: IProps) {
  const classes = useStyles();

  const { _id, id, url, votes, vote } = props;
  const [isLoading, setIsLoading] = useState(false);

  const catService = DIContainer.resolve<CatService>(CatService);

  async function handleButtonClick() {
    if (!isLoading) {
      try {
        setIsLoading(true);
        await vote(_id);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        throw e;
      }
    }
  }

  return (
    <Grid item xs={3}>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={url}>
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color="secondary"
              disabled={isLoading}
              onClick={handleButtonClick}
            >
              <FavoriteIcon className={classes.rightIcon} />
              Vote
            </Button>
            {isLoading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </CardMedia>
      </Card>
    </Grid>
  );
}
