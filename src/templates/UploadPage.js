import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { FETCH_PHOTOS_QUERY } from "../util/graphql";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));
function UploadPage(props) {
  const classes = useStyles();

  const [addPhoto] = useMutation(ADD_PHOTO);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [uploaded, setUploaded] = useState("");

  const onChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
    setSelectedFile(file);
    setFileInputState(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      addPhoto({
        variables: { fileStr: reader.result },
        // update(proxy, result) {
        // const data = proxy.readQuery({
        //   query: FETCH_PHOTOS_QUERY,
        // });
        // data.photos = [result.data.addPhoto, ...data.photos];
        // proxy.writeQuery({ query: FETCH_PHOTOS_QUERY, data });
        // },
      });
      setSelectedFile(reader.result);
    };
    reader.onerror = () => {
      console.error("ERROR");
    };
    setUploaded("Uploaded photo! Check your Gallery.");
  };

  return (
    <div>
      <Grid container direction="column" justify="center" alignContent="center">
        <Grid item>
          {uploaded === "" ? (
            <Typography variant="h3">Upload</Typography>
          ) : (
            <Typography>{uploaded}</Typography>
          )}
        </Grid>
        <form onSubmit={onSubmit}>
          <Grid item>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              name="fileStr"
              onChange={onChange}
              value={fileInputState}
            />
            <label htmlFor="contained-button-file">
              <Button
                startIcon={<PhotoCamera />}
                variant="contained"
                color="primary"
                component="span"
              >
                Upload
              </Button>
            </label>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </form>

        <Grid item>
          {previewSource && (
            <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

const ADD_PHOTO = gql`
  mutation addPhoto($fileStr: String!) {
    addPhoto(fileStr: $fileStr) {
      id
      username
      filepublicid
      tags
      likes
    }
  }
`;
export default UploadPage;
