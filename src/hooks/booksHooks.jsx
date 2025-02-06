import axios from "axios";
import { useState } from "react";
import baseUrl from "../const/const";
import { useNavigate } from "react-router-dom";

export default function useBooks() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookData, setBookData] = useState({
    book_title: "",
    book_summary: "",
    book_id: "",
    book_photo: null,
  });


  async function loadBooks({page,limit}){
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}api/v1/books?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${localStorage.jwt_token}`,
      "Content-Type": "application/json",
        },
      });
      console.log("response")
      setIsLoading(false);
      if (response.data.status === "success") {
        return [response.data.data.books, response.data.data.nums[0].nums];
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      throw new Error("Failed to load books");
    }
  };

  async function loadBooksById(id){
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}api/v1/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.jwt_token}`,
        },
      });
      setIsLoading(false);
      if (response.data.status === "success") {
        return response.data.data.book;
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


  return {
   
    error,
    isLoading,
    setIsLoading,
   loadBooks,
   loadBooksById,
  };
}
