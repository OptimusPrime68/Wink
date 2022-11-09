import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import "../styles/DropzonePost.css";
import axios from 'axios'
import {toast} from 'react-toastify'
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
import { Navigate, useNavigate } from "react-router-dom";
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

  const [caption,setCaption] = useState();

  let { user } = useSelector((state) => ({ ...state }))
  const navigate  = useNavigate();
  if(user == null) Navigate("/");







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

    const upload =  async () => {



      try{
      axios.post("http://localhost:4000/api/get-profile-id",{email:user.email}).then((data)=>{

      const id = data.data.id;

      axios.post("http://localhost:4000/api/make-post",{content:caption,authorid:id}).then((r)=>{

      const record = r.data;
      console.log(record);
      var x = files.length;

      if(files.length == 0)
      {
        toast.success("Post Created");
        props.onAddPosts(r.data._id);
        props.onClose();
        return;
      }

      files.map((e) => {
        console.log(e);
        let rand = (Math.random() + 1).toString(36).substring(7);
        const imageRef = ref(storage, `${user.email}/post/${record._id}/${rand}`);
        console.log(imageRef);
        uploadBytes(imageRef, e)
          .then(() => {
            setFiles(files.filter((a) => a !== e))
            x--;
            if(x == 0){
            toast.success("Post Created");
            props.onClose();
            props.onAddPosts(r.data._id);
            }
            else
            toast.success(x+ " Files Remaining");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      });

     
     
      
 
      }).catch((error)=>{
        console.log(error);
      });
     }).catch((err)=>{
       console.log(err);
     });
     }
      catch(err){
        console.log(err);
        toast.error(err.message);
      }
    };






  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Form.Control
          as="textarea"
          rows={3}
          onChange = {(e)=>setCaption(e.target.value)}
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
            onClick={upload}
          style={{ width: "max-content", marginTop: "10px" }}
        >
          Upload Post
        </button>
      </div>
    </>
  );
};

export default DropzonePost;
