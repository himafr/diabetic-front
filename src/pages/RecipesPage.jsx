import { useEffect, useState } from "react";
import RecipesSkeleton from "../state/loading_state/recipesSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import useRecipe from "../hooks/recipesHooks";
import baseUrl from "../const/const";
import RecipeCard from "../components/RecipeCard";

function RecipesPage() {
  
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const { loadRecipes } = useRecipe();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMoreRecipes = async () => {
    try {
      const [newRecipes, totalRecipesCount] = await loadRecipes({ page, limit: 6 });
      setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
      setTotalRecipes(totalRecipesCount);
      setPage((prevPage) => prevPage + 1);
    } catch (e) {
      e.message = "something went wrong please try again latter";
      console.log(e)
      alert(e.message)
      setError(e);
    }
  };

  useEffect(() => {
    async function getInitialRecipes() {
      setLoading(true);
      try {
        const [initialRecipes, totalRecipesCount] = await loadRecipes({
          page: 0,
          limit: 6,
        });
        setRecipes(initialRecipes);
        setTotalRecipes(totalRecipesCount);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        e.message = "No Medicine Found";
        console.log(e)
        alert(e.message)
        setError(e);
      }
    }
    getInitialRecipes();
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 ">
      <div className="flex flex-wrap -mx-2 tm-row justify-center">
        {loading ? (
          <>
            <RecipesSkeleton />
            <RecipesSkeleton />
            <RecipesSkeleton />
          </>
        ) : (
          <InfiniteScroll
            dataLength={recipes.length}
            next={loadMoreRecipes}
            hasMore={recipes.length < totalRecipes}
            loader={<p className="text-center mt-4">Loading more meds...</p>}
            endMessage={
              <p className="text-center mt-4">No more meds to display</p>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {recipes.map((recipe) => (
                <RecipeCard
                category={recipe.category_name}
                  instructions={`${recipe.instructions.substring(0, 200)}...`}
                  name={recipe.recipe_name}
                  key={recipe.recipe_id}
                  src={baseUrl + "get/" + recipe.recipe_photo}
                  linkPage={recipe.recipe_id}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
        {error && (
          <div className="text-center mt-4" style={{ color: "red" }}>
            {" "}
            {error.message}
          </div>
        )}
        {/*    
     <RecipesSkeleton />
     <recipeCard /> */}
      </div>
    </div>
  );


}

export default RecipesPage;
