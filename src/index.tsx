import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import {
  Typography,
  CssBaseline,
  Paper,
  ThemeProvider,
} from "@material-ui/core";

import { TopBar } from "./TopBar";
import { Papers } from "./Papers";
import { SideBar } from "./SideBar";
import { TPaperMatrix } from "./ChartModal";

import { useStyles, theme } from "./style";
import { Overlay } from "./Overlay/overlay";

export interface Paper {
  name: string;
  venue: string;
  year: number;
  VIS: string[];
  ML: string[];
  url?: string;
  image?: string;
  authors?: string;
}

export const getAvatar = (s: string) => {
  const pieces = s.split(" ");
  if (pieces.length > 1) {
    return `${pieces[0][0].toUpperCase()}${pieces[1][0].toUpperCase()}`;
  } else if (s === "Clustering") {
    return "CLT";
  } else if (s === "Classification") {
    return "CLS";
  } else if (s === "Regression") {
    return "RE";
  } else if (s === "Reinforcement") {
    return "RF";
  }
  return `${pieces[0][0].toUpperCase()}`;
};

export const rows = {
  upper: [
    "Media Types",
    "Visualization Types",
    "Story Thread",
    "Visualization-text Linking",
    "VBS Composition",
    "Interactive Implementation",
    "Target Devices",
  ],
  lower: [
    "Entity-orientation",
    "Story Complexity",
    "Story Schemata",
    "Plot Patterns",
    "Story Arc & Hook",
    "Linearity",
    "Factuality",
    "Other",
  ],
};

export const dimensions = {
  "Media Types": ["Audio", "Text", "Images", "Film", "Visualization"],
  "Visualization Types": [
    "Timeline",
    "Map",
    "Set",
    "Graph",
    "Chart",
    "Interaction",
  ],
  "Story Thread": [
    "Text",
    "Speech",
    "Juxtaposition",
    "Temporal Succession",
    "Moving Camera",
  ],
  "Visualization-text Linking": [
    "In-text References",
    "Visualization Legend",
    "Visualization Annotations",
    "Coordinated Scrolling",
    "Other",
  ],
  "VBS Composition": [
    "Rich Media Without Visualization",
    "Timeline Visualization",
    "Multi-timeline Visualization",
    "Narrative Pathway",
    "Mixed Pathway & Exploration Stories With Multiple Visualizations",
    "Pathways Through Multiple Visualizations",
  ],
  "Interactive Implementation": [
    "Annotated Chart",
    "Data Comic",
    "Scrollytelling",
    "Animation",
    "Slideshow",
    "Moving Camera",
    "Slideshow + Moving Camera",
  ],
  "Target Devices": [
    "Static Display",
    "Desktop / Touchscreen",
    "Mobile Device",
    "Large Display / Wall",
    "Multi-touch / Table",
    "Virtual Reality",
    "Augmented / Mixed Reality",
  ],
  "Entity-orientation": ["Objects", "Persons", "Sets", "Events", "Places"],
  "Story Complexity": [
    "Synchronic: Simple",
    "Synchronic: Medium",
    "Synchronic: Complex",
    "Diachronic: Simple",
    "Diachronic: Medium",
    "Diachronic: Complex",
  ],
  "Story Schemata": [
    "Actor Biography",
    "Object Biography",
    "Place Biography",
    "Hybrid Biography",
    "Biography Sequences",
    "Biography Bundles",
    "Inverted Trees",
    "Trees",
    "Larger Topic / Era",
    "Larger Topic / Multi-era",
  ],
  "Plot Patterns": [
    "Genesis Plot",
    "Emergence Plot",
    "Destruction Plot",
    "Metamorphosis Plot",
    "Cause & Effect",
    "Convergence",
    "Divergence",
    "Oscillation",
  ],
  "Story Arc & Hook": [
    "Set-up",
    "Rising Conflict / Supporting Facts",
    "Climax / Main Insight",
    "Resolution / Conclusion",
    "Story Hook",
  ],
  Linearity: ["Linear Storytelling", "Non-linear Storytellig"],
  Factuality: [
    "Factuality",
    "Uncertainty",
    "Fictitious Elements",
    "Fictitious Story World",
  ],
  Other: ["Gamification Elements", "Other Notable Elements"],
};

export default function App() {
  const classes = useStyles();
  // const defaultVersion = "VBSsurvey";
  const defaultVersion = "converted";

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [VISTags, setVISTags] = useState({});
  const [UpperRow, setUpperRow] = useState({});
  const [LowerRow, setLowerRow] = useState({});
  const [MLTags, setMLTags] = useState({});
  const [searchKey, setSearchKey] = useState("");
  const [selectedPaper, setSelectedPaper] = useState<null | Paper>(null);
  const [version, setVersion] = useState(defaultVersion);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [paperYear, setPaperYears] = useState<{ [k: string]: number }>({});
  const [paperArea, setPaperAreas] = useState<{ [k: string]: number }>({});
  const [paperMatrix, setPaperMatrix] = useState<TPaperMatrix>({
    VISData: [],
    VISTags: [],
    MLTags: [],
    MLData: [],
    matrix: [],
  });

  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  const fetchData = async (version) => {
    const papers = await fetch(`/assets/${version}.json`).then((res) =>
      res.json()
    );
    setPapers(papers);
    const initialVISTag = [];

    const initialUpperRow = papers.reduce((o, d) => {
      rows.upper.forEach((dimension) => {
        for (const cat of dimensions[dimension]) {
          if (d[dimension].includes(cat)) {
            o[`${dimension}:${cat}`] = true;
          } else {
            if (!(`${dimension}:${cat}` in o)) {
              o[`${dimension}:${cat}`] = false;
            }
          }
        }
      });
      return o;
    }, {});

    const initialLowerRow = papers.reduce((o, d) => {
      rows.lower.forEach((dimension) => {
        for (const cat of dimensions[dimension]) {
          if (d[dimension].includes(cat)) {
            o[`${dimension}:${cat}`] = true;
          } else {
            if (!(`${dimension}:${cat}` in o)) {
              o[`${dimension}:${cat}`] = false;
            }
          }
        }
      });
      return o;
    }, {});

    const initialMLTag = [];

    const initialPaperYear = papers.reduce((o, d) => {
      if (!(d.year in o)) {
        o[d.year] = 1;
      } else {
        o[d.year] += 1;
      }
      return o;
    }, {});

    const initialPaperArea = papers.reduce((o, d) => {
      if (!(d.venue in o)) {
        o[d.venue] = 1;
      } else {
        o[d.venue] += 1;
      }
      return o;
    }, {});

    const MLTags = Object.keys(initialMLTag);
    const VISTags = Object.keys(initialVISTag);
    const UpperRow = Object.keys(initialUpperRow);
    const LowerRow = Object.keys(initialLowerRow);

    let initialMatrix = VISTags.map((_) => MLTags.map((_) => 0));

    papers.forEach((p) => {
      /* VISTags.forEach((vis, i) => {
        MLTags.forEach((ml, j) => {
          if (p["ML"].includes(ml) && p["VIS"].includes(vis))
            initialMatrix[i][j] += 1;
        });
      }); */
    });

    const matrix = initialMatrix
      .map((row, i) => {
        return row.map((cell, j) => {
          return [j, i, cell > 0 ? cell : undefined] as [
            number,
            number,
            number | undefined
          ];
        });
      })
      .flat();

    const MLData = MLTags.map((ml) => {
      return papers.filter((p) => p["ML"].includes(ml)).length;
    });

    const VISData = VISTags.map((vis) => {
      return papers.filter((p) => p["VIS"].includes(vis)).length;
    });

    console.log("initialUpperRow", initialUpperRow);

    setPaperMatrix({ MLTags, VISTags, MLData, VISData, matrix });
    setPaperAreas(initialPaperArea);
    setPaperYears(initialPaperYear);
    setVISTags(initialVISTag);
    setUpperRow(initialUpperRow);
    setLowerRow(initialLowerRow);
    setMLTags(initialMLTag);
  };

  useEffect(() => {
    fetchData(defaultVersion);
  }, []);

  const onProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClickFilter = (
    tag: string,
    type: "UpperRow" | "LowerRow",
    select: boolean
  ) => {
    if (type === "UpperRow") {
      if (tag.includes("allCategories")) {
        const cleanedTag = tag.replace("allCategories", "");
        const newUpperRow = {
          ...UpperRow,
        };

        for (const setDim of dimensions[cleanedTag]) {
          newUpperRow[`${cleanedTag}:${setDim}`] = !select;
        }

        setUpperRow(newUpperRow);
      } else {
        const newUpperRow = {
          ...UpperRow,
          [tag]: !UpperRow[tag],
        };
        setUpperRow(newUpperRow);
      }
    } else if (type === "LowerRow") {
      if (tag.includes("allCategories")) {
        const cleanedTag = tag.replace("allCategories", "");
        const newLowerRow = {
          ...LowerRow,
        };

        for (const setDim of dimensions[cleanedTag]) {
          newLowerRow[`${cleanedTag}:${setDim}`] = !select;
        }

        setLowerRow(newLowerRow);
      } else {
        const newLowerRow = {
          ...LowerRow,
          [tag]: !LowerRow[tag],
        };
        setLowerRow(newLowerRow);
      }
    }
  };
  const onSetSearchKey = (searchKey: string) => {
    setSearchKey(searchKey.toLowerCase());
  };

  const onSetVersion = (version: string) => {
    setVersion(version);
    fetchData(version);
  };

  const papersAfterFilter = papers.filter((p) => {
    const upperCats = rows.upper.map((u) => {
      return p[u].map((e) => `${u}:${e}`);
    });

    const lowerCats = rows.lower.map((l) => {
      return p[l].map((e) => `${l}:${e}`);
    });

    const reducedUpperCats = upperCats.some((dim) => {
      return dim.some((u) => UpperRow[u]);
    });

    const reducedLowerCats = lowerCats.some((dim) => {
      return dim.some((u) => LowerRow[u]);
    });

    return (
      (reducedUpperCats || reducedLowerCats) &&
      /* upperCats.every((u) => UpperRow[u]) &&
        lowerCats.every((l) => LowerRow[l]) && */
      p["Name/Title"].toLowerCase().includes(searchKey)
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />

        <TopBar
          menuId={menuId}
          onProfileMenuOpen={onProfileMenuOpen}
          handleDrawerToggle={handleDrawerToggle}
        />

        <SideBar
          paperNumber={papersAfterFilter.length}
          VISTags={VISTags}
          MLTags={MLTags}
          UpperRow={UpperRow}
          LowerRow={LowerRow}
          version={version}
          onClickFilter={onClickFilter}
          onSetSearchKey={onSetSearchKey}
          onSetVersion={onSetVersion}
          paperYear={paperYear}
          paperArea={paperArea}
          paperMatrix={paperMatrix}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />

        <Papers
          papers={papersAfterFilter}
          setSelectedPaper={setSelectedPaper}
        />

        {selectedPaper && (
          <Overlay
            onClose={() => {
              setSelectedPaper(null);
            }}
            paper={selectedPaper}
          ></Overlay>
        )}
      </div>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
