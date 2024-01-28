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
import { Paper as TPaper, colors, dimensions, getAvatar, rows } from "../index";
import { useStyles } from "./style";
import { useStyles as useStylesPaper } from "../Papers/style";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

interface Props {
  paper: TPaper;
  onClose: () => void;
}

export function Overlay(props: Props) {
  const { paper, onClose } = props;

  const [open, setOpen] = React.useState<boolean>(paper !== null);

  const classes = useStyles();
  const paperClasses = useStylesPaper();
  const onClickPaper = (paper: TPaper) => {
    window.open(
      paper.url ||
        `https://www.google.com/search?q=${paper.name.replace(" ", "+")}`,
      "_blank"
    );
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        if (onClose) {
          onClose();
        }
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ boxshadow: 24, p: 4 }} className={classes.overlay}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {paper["Name/Title"]}
        </Typography>
        <Typography>{paper.Authors}</Typography>
        <Typography>{paper.Venue}</Typography>
        <Typography>
          <a href={paper.Link} target="_blank">
            {paper.Link}
          </a>
        </Typography>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "20vw 30vw",
            gridTemplateRows: "auto auto",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          {paper.Image && (
            <img
              src={`assets/images/${paper.Image}`}
              style={{ width: "100%" }}
            />
          )}
          {paper.Abstract && paper.Abstract !== "None" && (
            <Typography className={classes.description}>
              {paper.Abstract}
            </Typography>
          )}
          {paper.Description && paper.Description !== "None" && (
            <Typography className={classes.description}>
              {paper.Description}
            </Typography>
          )}
        </div>
        <div className={paperClasses.tags}>
          {rows.upper.map((dimension) => {
            return (
              <div>
                <b>{dimension}</b>
                <div>
                  {paper[dimension].map((cat) => {
                    return (
                      <Chip
                        key={`${dimension}:${cat}`}
                        avatar={
                          <Avatar
                            style={{
                              color: "white",
                              backgroundColor: colors[dimension],
                            }}
                          >
                            <b>{getAvatar(cat)}</b>
                          </Avatar>
                        }
                        label={`${cat[0].toUpperCase()}${cat.slice(1)}`}
                        variant={"default"}
                        style={{
                          marginTop: "2px",
                          color: "white",
                          backgroundColor: colors[dimension]
                            ?.replace("rgb", "rgba")
                            .replace(")", ",0.8)"),
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className={paperClasses.tags}>
          {rows.lower.map((dimension) => {
            return (
              <div>
                <b>{dimension}</b>
                <div>
                  {paper[dimension].map((cat) => {
                    return (
                      <Chip
                        key={`${dimension}:${cat}`}
                        avatar={
                          <Avatar
                            style={{
                              color: "white",
                              backgroundColor: colors[dimension],
                            }}
                          >
                            <b>{getAvatar(cat)}</b>
                          </Avatar>
                        }
                        label={`${cat[0].toUpperCase()}${cat.slice(1)}`}
                        variant={"default"}
                        style={{
                          marginTop: "2px",
                          color: "white",
                          backgroundColor: colors[dimension]
                            ?.replace("rgb", "rgba")
                            .replace(")", ",0.8)"),
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Box>
    </Modal>
  );
}
