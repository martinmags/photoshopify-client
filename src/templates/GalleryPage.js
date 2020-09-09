// TODO: Add authenticated functionalities
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "@apollo/react-hooks";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import gql from "graphql-tag";
import { theme } from "../theme";
import { useParams } from "react-router-dom";
import { Image } from "cloudinary-react";

const useStyles = makeStyles((theme) => ({
  horizontal: {
    height: "2px",
    backgroundColor: "#000",
  },
  gridList: {
    width: "90vw",
    height: "auto",
  },
  image: {
    height: 300,
    overflow: "hidden",
  },
  gallery: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  marginBottom5: {
    marginBottom: "5vh",
  },
  gridListTileBar: {
    fontSize: "12px",
  },
}));

function GalleryPage() {
  const classes = useStyles();

  /* Responsive GridList */
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, [width]);
  const getGridListCols = () => {
    const small =
      theme.breakpoints.values["sm"] <= width &&
      width < theme.breakpoints.values["md"] / 1.25;
    const medium =
      theme.breakpoints.values["md"] / 1.25 <= width &&
      width < theme.breakpoints.values["lg"];
    const large = theme.breakpoints.values["lg"] <= width;
    if (large) return 4;
    if (medium) return 3;
    if (small) return 2;
    return 1;
  };

  // Fetch params:username's photo gallery
  const { username } = useParams();
  const { loading, data } = useQuery(FETCH_OWN_PHOTOS_QUERY, {
    variables: { username: username },
  });

  let gallery_content = null;
  if (loading) {
    gallery_content = (
      <Grid item xs={3} style={{ textAlign: "center" }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (data) {
    const { photosByUsername: photos } = data;

    gallery_content = photos.map((photo) => (
      <GridListTile key={photo.id}>
        <Image
          cloudName="martinmags"
          publicId={photo.filepublicid}
          alt={photo.username}
          height="200"
          crop="scale"
        />
      </GridListTile>
    ));
  }

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        className={classes.marginBottom5}
      >
        <Grid item xs={11} className={classes.marginBottom5}>
          <Typography variant="h1">{username}</Typography>
        </Grid>
        <Grid item xs={11}>
          <hr className={classes.horizontal} />
        </Grid>
      </Grid>
      {/* Gallery */}
      <div className={classes.gallery}>
        <GridList
          cellHeight={200}
          spacing={10}
          className={classes.gridList}
          cols={getGridListCols()}
        >
          {gallery_content}
        </GridList>
      </div>
    </div>
  );
}

const FETCH_OWN_PHOTOS_QUERY = gql`
  query photosByUsername($username: String!) {
    photosByUsername(username: $username) {
      likes
      filepublicid
      id
      username
    }
  }
`;

export default GalleryPage;
