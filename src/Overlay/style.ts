import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Flare } from "@material-ui/icons";

const titleLineHeight = 1.4;
const titleMaxLines = 3;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    overlay: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      border: "2px solid #000",
    },
    description: {
      height: "200px",
      overflow: "hidden",
      overflowY: "scroll",
    },
  })
);
