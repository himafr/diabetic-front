import axios from "axios";
import { useState } from "react";
import baseUrl from "../const/const";

export default function useReview() {
    const [myReview, setMyReview] = useState({
      review_rating: 0,
      review_content: "",
    });
    function onCommentChange(comment){
      setMyReview(val=>{return {...val,review_content:comment}})
      console.log(myReview)
  }
    function onRateChange(rate){
      setMyReview(val=>{return {...val,review_rating:rate}})
  }
    async function addReview(route,id) {
      try {
        const response = await axios.post(
          `${baseUrl}api/v1/${route}/review/${id}`,
          myReview,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.jwt_token}`,
            },
          }
        );

        if (response.data.status === "success") {
          setMyReview({
            review_rating: 0,
            review_content: "",
          });
          window.location.reload();
        }

      } catch (error) {
        console.log(error);
      }
    }
    return {
        addReview,
        myReview,
        onCommentChange,
        onRateChange
    };
  }


