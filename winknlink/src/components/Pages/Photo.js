import React, { useEffect, useState } from "react";
import axios from "axios";
import {storage,} from '../../firebase'
import { ref,uploadBytes,listAll,getDownloadURL, list } from "firebase/storage";
import "../styles/landingPage.css";



const Photo = ({history}) => {

  const [imageUpload,setImageUpload] = useState(null);
  const [imageList,setImageList] = useState([]);
  const [user,setUser] = useState([]);
  const [list,setList] = useState([]);
  


  useEffect(() =>{


   
    //  axios
    //       .post("http://localhost:4000/api/all-profile",{email:"piyushjaiswal380@gmail.com"})
    //       .then(function (response) {
    //         response.data.forEach(function (x) {

    //             var imageListRef = ref(storage,`${x.email}`);
              
    //             listAll(imageListRef).then((response)=>{
    //             response.items.forEach((item)=>{
    //                 getDownloadURL(item).then((url)=>{
    //                     if(url.includes("profile")){

    //                         var local = {
    //                             name:x.name,
    //                             gender:x.gender,
    //                             hobbies:x.hobbies,
    //                             dob:x.dob,
    //                             email:x.email,
    //                             image:url
    //                         }
    //                         setList((prev)=>[...prev,local]);
                           
    //                     }
    //                 })
    //             })
    //           })
                
    //         });
      

    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });



  //   axios
  //         .post("http://localhost:4000/api/make-match",{fromemail:"piyushjaiswal380@gmail.com",toemail:"piyushjaiswal@gmail.com"})
  //         .then(function (response) {
  //          console.log(response);
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });

      axios
          .post("http://localhost:4000/api/all-match",{email:"piyushjaiswal380@gmail.com"})
          .then(function (response) {
           console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

   },[])


  console.log(list);



  return (
    
     <>

             
              

              {list &&  list.map((url)=>{
                  return <img src={url.image} />
              })}
         

         </>
  );
}


export default Photo;