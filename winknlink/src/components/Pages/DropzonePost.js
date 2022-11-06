import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import "../styles/DropzonePost.css";
// import {
//   ref,
//   uploadBytes,
//   listAll,
//   getDownloadURL,
//   list,
//   deleteObject,
// } from "firebase/storage";
// import { storage } from "../../firebase";
// import { getStorage } from "firebase/storage";
// import { useSelector, useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { Navigate, useNavigate } from "react-router-dom";

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

const DropzonePost = (props) => {
  const [files, setFiles] = useState([]);
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

  //   const { user } = useSelector((state) => ({ ...state }));
  //   const navigate = useNavigate();

  //   if (user == null) Navigate("/");

  //   console.log(user);

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

  //   const upload = () => {
  //     files.map((e) => {
  //       let r = (Math.random() + 1).toString(36).substring(7);

  //       const imageRef = ref(storage, `${user.email}/${r}`);
  //       console.log(imageRef);
  //       uploadBytes(imageRef, e)
  //         .then(() => {
  //           toast.success("Image Uploaded");
  //           setFiles([]);
  //           console.log(e);
  //         })
  //         .catch((err) => {
  //           toast.error(err.message);
  //         });
  //     });
  //   };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Caption..."
          style={{ width: "300px", margin: "auto" }}
        />
        <section
          className="container"
          style={{
            maxWidth: "400px",
            marginTop: "10px",
          }}
        >
          <div {...getRootProps({ className: "mainDropzonePost" })}>
            <input {...getInputProps()} />
          </div>
          <aside style={thumbsContainer}>{thumbs}</aside>
        </section>

        <button
          className="SettingButton"
          type="button"
          //   onClick={upload}
          style={{ width: "max-content", marginTop: "10px" }}
        >
          Upload Post
        </button>
      </div>
    </>
  );
};

export default DropzonePost;
