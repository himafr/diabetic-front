import axios from "axios";
import { useState } from "react";
import baseUrl from "../const/const";

export default function useRecipe() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [recipeData, setRecipeData] = useState({
  //   recipe_title: "",
  //   recipe_summary: "",
  //   recipe_id: "",
  //   recipe_photo: null,
  // });


  async function loadRecipes({page,limit}){
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}api/v1/recipes?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${localStorage.jwt_token}`,
      "Content-Type": "application/json",
        },
      });
      console.log("response")
      setIsLoading(false);
      if (response.data.status === "success") {
        return [response.data.data.recipes, response.data.data.nums[0].nums];
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      throw new Error("Failed to load Recipes");
    }
  };

  async function loadRecipesById(id){
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}api/v1/Recipes/${id}`, {
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


  return {
   
    error,
    isLoading,
    setIsLoading,
   loadRecipes,
   loadRecipesById,
  };
}
