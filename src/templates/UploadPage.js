import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { FETCH_PHOTOS_QUERY } from "../util/graphql";

function UploadPage() {
  const [addPhoto] = useMutation(ADD_PHOTO);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

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
        update(proxy, result) {
          const data = proxy.readQuery({
            query: FETCH_PHOTOS_QUERY,
          });
          console.log(FETCH_PHOTOS_QUERY);
          data.photos = [result.data.addPhoto, ...data.photos];
          proxy.writeQuery({ query: FETCH_PHOTOS_QUERY, data });
        },
      });
      setSelectedFile(reader.result);
    };
    reader.onerror = () => {
      console.error("ERROR");
    };
  };

  return (
    <div>
      <h1>Upload</h1>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="fileStr"
          onChange={onChange}
          value={fileInputState}
        />
        <button type="submit">Submit</button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
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
