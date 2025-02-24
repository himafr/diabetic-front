import { useState } from "react";
import baseUrl from "../const/const";

export default function useUser(){
  const [userData, setUserData] = useState({
    // address: "",
    // email: "",
    // date_of_birth: "",
    // cover_photo: null,
    // photo:null,
    // number:"",
    // last_name:"",
    // first_name:"",
  });
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setUserData({ ...userData, [e.target.name]: e.target.value });
    console.log(userData)
  };

  const handleFilesChange = (e) => {
    const file = e.target.files[0];
    setUserData({ ...userData, [e.target.name]: file });
    console.log(userData);
    console.log(file);
    // if (file && file instanceof File) {
    //   setPreview(URL.createObjectURL(file));
    // } else {
    //   console.error("Invalid file:", file);
    // }
  };
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }    
async function getUserById(id){
  try{
        const response= await fetch(`${baseUrl}api/v1/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.jwt_token}`,
                },
            })
            const res= await response.json()
            
                if (res.status == "success") {
                    return res.data
                }
            }catch(e){
                throw new Error(e);
            }
        };
async function  changeUserData (e){
e.preventDefault();
  console.log("data")
    if (isEmpty(userData)) throw new Error("No data to be sent")
        try{
        const response= await fetch(`${baseUrl}api/v1/users/id`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.jwt_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            })
            const res= await response.json()
            
                if (res.status == "success") {
                  window.location.reload()
                    return res.data
                }
            }catch(e){
                throw new Error(e);
            }
        };
  
 async function changePhoto(type) {
    const formData = new FormData();
    if (type == "cover") {
    formData.append(
      "cover",
     userData.cover_photo
    );}
    else if (type == "photo") {
    formData.append(
      "photo",
     userData.photo
    );}
try{
const response=await   fetch(`${baseUrl}api/v1/users/${type}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.jwt_token}`,
      },
      body: formData,
    })
 const res=await response.json()
        if (res.status == "success") {
          window.location.reload();
        } else {
          alert(res.message);
        }
      }catch(error) {
        alert(error);
      };
    }

      return{
        changeUserData,
        changePhoto,
        getUserById,
        userData,
        handleChange,
        handleFilesChange,
      }
  }
  
