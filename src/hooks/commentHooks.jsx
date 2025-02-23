import axios from "axios";
import { useState } from "react";
import baseUrl from "../const/const";

export default function useComments() {
  const [commentData, setCommentsData] = useState({
    comment_content: "",
  });
function onCommentChange(comment){
    setCommentsData(val=>{return {...val,comment_content:comment}})
}
    async function addComment(route,id) {
      try {
        const response = await axios.post(
          `${baseUrl}api/v1/${route}/comments/${id}`,
          commentData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.jwt_token}`,
            },
          }
        );

        if (response.data.status === "success") {
          setCommentsData({
            comment: "",
          });
          window.location.reload();
        }

      } catch (error) {
        console.log(error);
      }
    }
    return {
        addComment,
        onCommentChange,
        commentData,
    };
  }


