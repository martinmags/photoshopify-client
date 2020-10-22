import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "@apollo/react-hooks";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { theme } from "../theme";
import { Image } from "cloudinary-react";
import { FETCH_PHOTOS_QUERY /*FETCH_USERS_QUERY*/ } from "../util/graphql";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    objectFit: "cover",
  },
  horizontal: {
    height: "2px",
    backgroundColor: "#000",
  },
  gridList: {
    width: "90vw",
    height: "auto",
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

function HomePage() {
  const classes = useStyles();

  // Responsive GridList
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

  // Registered Users List
  // let users_list = null;
  // const { data: usersList } = useQuery(FETCH_USERS_QUERY);
  // if (usersList) {
  //   const { users } = usersList;
  //   users_list = users.map((user) => (
  //     <Grid key={user.id} item>
  //       <li>{user.username}</li>
  //     </Grid>
  //   ));
  // }

  // Public Gallery Content
  const { loading, data } = useQuery(FETCH_PHOTOS_QUERY);
  let gallery_content = null;
  if (loading) {
    gallery_content = (
      <Grid item xs={3} style={{ textAlign: "center" }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (data) {
    const { photos } = data;
    gallery_content = photos.map((photo) => (
      <GridListTile key={photo.id}>
        <Image
          cloudName="martinmags"
          publicId={photo.filepublicid}
          alt={photo.username}
          height="200"
          crop="scale"
          className={classes.image}
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
          <Typography variant="h1">
            Discover the world's best photographers
          </Typography>
        </Grid>
        <Grid item xs={11}>
          <hr className={classes.horizontal} />
        </Grid>
      </Grid>
      {/* Registered Users */}
      {/* <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h3">Registered Users</Typography>
          </Grid>

          <ul>{users_list}</ul>
        </Grid>
      </div> */}
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

export default HomePage;
