import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "../styles/Dropzone.css";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  list,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase";
import { getStorage } from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from './Loader'

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const Dropzone = (props) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const { acceptedFiles } = useDropzone();

  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  if (user == null) Navigate("/");

  console.log(user);

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  const upload = () => {
    
    files.map((e) => {
      setLoading(true);
      let r = (Math.random() + 1).toString(36).substring(7);

      const imageRef = ref(storage, `${user.email}/${r}`);
      console.log(imageRef);
      uploadBytes(imageRef, e)
        .then(() => {
          toast.success("Image Uploaded");
          setLoading(false);
          setFiles([]);
          console.log(e);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    });
  };

  return (
    <>
     {loading ? <Loader /> : <></>}
      <div style={{ textAlign: "center" }}>
        <section className="container">
          <div {...getRootProps({ className: "mainDropzone" })}>
            <input {...getInputProps()} />
          </div>
          <aside style={thumbsContainer}>{thumbs}</aside>
        </section>
        <button
          className="SettingButton"
          type="button"
          onClick={upload}
          style={{ width: "max-content" }}
        >
          Upload Photo
        </button>
      </div>
    </>
  );
};

export default Dropzone;
