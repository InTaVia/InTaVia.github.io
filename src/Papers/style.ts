import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Flare } from "@material-ui/icons";

const titleLineHeight = 1.4;
const titleMaxLines = 3;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    grow: {
      flexGrow: 1,
    },
    control: {
      padding: theme.spacing(2),
    },
    item: {
      display: "flex",
    },
    card: {
      width: 320,
      /*height: 280, */
      cursor: "pointer",
      display: "grid",
      gridTemplateRows: "max-content auto",
    },
    cardContent: {
      display: "flex",
      flexDirection: "column",
      paddingBottom: "12px !important",
      height: "100%",
      justifyContent: "space-between",
    },
    title: {
      position: "relative",
      lineHeight: `${titleLineHeight}rem`,
      maxHeight: `${titleMaxLines * titleLineHeight}rem`,
      fontWeight: 500,
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical",
      // paddingRight: '1rem' /* space for ellipsis */,
    },
    tags: {
      marginTop: 8,
      display: "flex",
      "& > *": {
        margin: theme.spacing(0.5),
        fontSize: 14,
      },
    },
    VISTag: {
      backgroundColor: theme.palette.primary.main,
      width: 32,
      height: 32,
    },
    MLTag: {
      backgroundColor: theme.palette.secondary.main,
      width: 32,
      height: 32,
      fontSize: "14px",
      marginLeft: "-4px",
    },
    pos: {
      marginBottom: 12,
    },
    avatarGroup: {
      // margin: "0px 6px"
    },
    thumbnail: {
      /*       height: "100px", */
      width: "100%",
      aspectRatio: "16 /9",
    },
    authors: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical",
    },
  })
);
