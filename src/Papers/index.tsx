import React from "react";
import {
  Grid,
  Paper,
  Card,
  Button,
  CardActions,
  Avatar,
  Chip,
  CardContent,
  Typography,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { Paper as TPaper, colors, getAvatar, rows } from "../index";
import { useStyles } from "./style";
import CardMedia from "@mui/material/CardMedia";

interface Props {
  papers: TPaper[];
  setSelectedPaper: (paper: TPaper) => void;
}

export function Papers(props: Props) {
  const { papers, setSelectedPaper } = props;
  const classes = useStyles();
  const onClickPaper = (paper: TPaper) => {
    if (setSelectedPaper) {
      setSelectedPaper(paper);
    }
    /* window.open(
      paper.url ||
        `https://www.google.com/search?q=${paper.name.replace(" ", "+")}`,
      "_blank"
    ); */
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {papers.map((paper, i) => (
            <Grid key={i} item className={classes.item}>
              <Card
                sx={{ maxWidth: 345 }}
                className={classes.card}
                onClick={() => onClickPaper(paper)}
              >
                {/* <CardMedia sx={{ height: 140 }} image={paper.image} /> */}
                <CardContent className={classes.cardContent}>
                  {/* <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {paper.venue} {paper.year}
                  </Typography> */}
                  <Typography
                    variant="subtitle1"
                    component="p"
                    className={classes.title}
                  >
                    {paper["Name/Title"]}
                  </Typography>
                  {/* <Typography className={classes.pos} color="textSecondary">
                    {paper.venue} {paper.year}
                  </Typography> */}
                  {paper.Image && (
                    <img
                      className={classes.thumbnail}
                      style={{
                        border: "solid 1px gray",
                        height: "100px",
                        width: "min-content",
                      }}
                      src={`assets/images/${paper.Image}`}
                    ></img>
                  )}
                  {/* <div className={classes.grow}> */}
                  <Typography
                    variant="body2"
                    component="p"
                    className={classes.authors}
                  >
                    {paper.Authors}
                  </Typography>
                  {/* </div> */}
                  <div className={classes.tags}>
                    <AvatarGroup className={classes.avatarGroup}>
                      {rows["upper"].flatMap((group) => {
                        return paper[group].map((v) => (
                          <Avatar
                            key={v}
                            className={classes.VISTag}
                            style={{
                              color: "white",
                              backgroundColor: colors[group],
                            }}
                          >
                            {getAvatar(v)}
                          </Avatar>
                        ));
                      })}
                    </AvatarGroup>
                    <AvatarGroup className={classes.avatarGroup}>
                      {/* {paper["Visualization Types"].map((m) => (
                        <Avatar key={m} className={classes.MLTag}>
                          <b>{getAvatar(m)}</b>
                        </Avatar>
                      ))} */}
                      {rows["lower"].flatMap((group) => {
                        return paper[group].map((v) => (
                          <Avatar
                            key={v}
                            className={classes.MLTag}
                            style={{
                              color: "white",
                              backgroundColor: colors[group],
                            }}
                          >
                            {getAvatar(v)}
                          </Avatar>
                        ));
                      })}
                    </AvatarGroup>
                  </div>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
