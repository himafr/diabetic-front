import axios from "axios";
import { useState } from "react";
import baseUrl from "../const/const";

export default function useReview() {
    const [myRate, setMyRate] = useState(0)
  

    async function addReview(route,id) {
      try {
        const response = await axios.post(
          `${baseUrl}api/v1/${route}/review/${id}`,
          {review_rating:myRate},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.jwt_token}`,
            },
          }
        );

        if (response.data.status === "success") {
          setMyRate({
            review_rating: 0,
          });
          window.location.reload();
        }

      } catch (error) {
        console.log(error);
      }
    }
    return {
        addReview,
        myRate,
        setMyRate,
    };
  }


