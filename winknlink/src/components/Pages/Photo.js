import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import {storage,} from '../../firebase'
import { ref,uploadBytes,listAll,getDownloadURL, list } from "firebase/storage";
import "../styles/landingPage.css";



const Photo = ({history}) => {

  const [imageUpload,setImageUpload] = useState(null);
  const [imageList,setImageList] = useState([]);
  const imageListRef = ref(storage,"");
  const upload =  async (e) =>{
      e.preventDefault();
      if(imageUpload){

        const imageRef = ref(storage,"name");
        uploadBytes(imageRef,imageUpload).then(()=>{
            alert("Image Uploaded");
        }).catch((err)=>{
            console.log(err);
        })
      }
     
  }

  useEffect(() =>{

    listAll(imageListRef).then((response)=>{
        response.items.forEach((item)=>{
            getDownloadURL(item).then((url)=>{
                setImageList((prev)=>[...prev,url]);
            })
        })
    })

  },[])


  return (
    
     <>

              <input type="file" onChange={(e) => {
                  setImageUpload(e.target.files[0])
              }}/>
              <button type="submit" onClick={upload}>Upload</button>

              {imageList &&  imageList.map((url)=>{
                  return <img src={url} />
              })}
         

         </>
  );
}


export default Photo;