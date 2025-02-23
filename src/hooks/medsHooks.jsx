import axios from "axios";
import { useState } from "react";
import baseUrl from "../const/const";
import { useNavigate } from "react-router-dom";

export default function useMeds() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [medData, setMedData] = useState({
    med_name: "",
    med_price: "",
    med_summary: "",
    med_photo: null,
    med_cat:"",
  });
  const handleChange = (e) => {
    setMedData({ ...medData, [e.target.name]: e.target.value });
  };

  const handleFilesChange = (e) => {
    console.log(medData);
    const file = e.target.files[0];
    setMedData({ ...medData, [e.target.name]: file });
    if (file && file instanceof File) {
      setPreview(URL.createObjectURL(file));
    } else {
      console.error("Invalid file:", file);
    }
  };

  async function loadMeds({page,limit}){
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}api/v1/meds?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${localStorage.jwt_token}`,
        },
      });
      console.log("response")
      setIsLoading(false);
      if (response.data.status === "success") {
        return [response.data.data.meds, response.data.data.nums[0].nums];
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      throw new Error("Failed to load meds");
    }
  };

  async function loadMedById(id){
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}api/v1/meds/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.jwt_token}`,
        },
      });
      setIsLoading(false);
      if (response.data.status === "success") {
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      const err=new Error
      if (error.response?.data?.message) {
        err.message=error.response.data.message
      } else {
        err.message="something went wrong"
      }
      throw err;
    }
  }

  async function addMedicine(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("med_name", medData.med_name);
    formData.append("med_price", medData.med_price);
    formData.append("med_summary", medData.med_summary);
    formData.append("med_photo", medData.med_photo);
    formData.append("med_cat", medData.med_cat);
    try {
      const response = await axios.post(`${baseUrl}api/v1/meds`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.jwt_token}`,
        },
      });

      if (response.data.status === "success") {
        setMedData({
          med_name: "",
          med_price: "",
          med_summary: "",
          med_cat:"",
          med_photo: null,
        });
        setIsLoading(false);
        navigate("/app/medicine");
      } else {
        setIsLoading(false);
        setError(response.data.message);
        setTimeout(() => setError(null), 3000);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("something went wrong");
      }
      setTimeout(() => setError(null), 3000);
    }
  }

  async function updateMed(e,id) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.patch(`${baseUrl}api/v1/meds/${id}`,medData, {
        headers: {
          Authorization: `Bearer ${localStorage.jwt_token}`,
        },
      });
      if (response.data.status === "success") {
        setMedData({
          med_name: "",
          med_price: "",
          med_summary: "",
          med_photo: null,
          med_cat:"",
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError(response.data.message);
        setTimeout(() => setError(null), 3000);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      const err=new Error
      if (error.response?.data?.message) {
        err.message=error.response.data.message
      } else {
        err.message="something went wrong"
      }
      throw err;
    }
  };
  
  async function deleteMed(e,id) {
    e.preventDefault();
    setIsLoading(true);
   console.log(id);
    try {
      const response = await axios.delete(`${baseUrl}api/v1/meds/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.jwt_token}`,
        },
      });

      if (response.data.status === "success") {
        setIsLoading(false);
        navigate("/app/medicine");
      } else {
        setIsLoading(false);
        setError(response.data.message);
        setTimeout(() => setError(null), 3000);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      const err=new Error
      if (error.response?.data?.message) {
        err.message=error.response.data.message
      } else {
        err.message="something went wrong"
      }
      throw err;
    }
  }
  
  // async function deleteComment(id) {
  //   setIsLoading(true);
  //  console.log(id);
  //   try {
  //     const response = await axios.delete(`${baseUrl}api/v1/meds/comments/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.jwt_token}`,
  //       },
  //     });

  //     if (response.data.status === "success") {
  //       setIsLoading(false);
  //     } else {
  //       setIsLoading(false);
  //       setError(response.data.message);
  //       setTimeout(() => setError(null), 3000);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //     const err=new Error
  //     if (error.response?.data?.message) {
  //       err.message=error.response.data.message
  //     } else {
  //       err.message="something went wrong"
  //     }
  //     throw err;
  //   }
  // }


  return {
    medData,
    handleChange,
    addMedicine,
    handleFilesChange,
    preview,
    error,
    isLoading,
    loadMeds,
    setIsLoading,
    loadMedById,
    setMedData,
    updateMed,
    deleteMed,
    // deleteComment,
  };
}
