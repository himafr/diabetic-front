import { useEffect, useState } from "react";
import styles from "./RecipePage.module.css";
import { useParams } from "react-router-dom";
import baseUrl from "../../const/const";
import Badge from "../../components/Badge";
import useRecipe from "../../hooks/recipesHooks";
import useReview from "../../hooks/reviewHooks";
import StarRating from "../../components/starRating/StarRating";
import { useAuth } from "../../context/AuthContext";

function RecipePage() {

  const [recipe, setRecipe] = useState([]);
  const [rating, setRating] = useState([{review_rating:0,review_content:""}]);
  const { id } = useParams();
  const { loadRecipesById } = useRecipe();
  const [loading, setLoading] = useState(true);
  const {addReview,myReview,onCommentChange,onRateChange}=useReview()

  const {user}=useAuth()

  useEffect(() => {
    setLoading(true);
    loadRecipesById(id)
      .then((data) => {
        console.log(data);
        setRecipe(data.recipe);
        if (data.review.length != 0) setRating(data.review);
console.log(rating.filter((rating)=>rating.user_id==user.userId ).length)
console.log(rating.filter((rating)=>rating.user_id==user.userId ).length)
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(setLoading(false));
  }, [id]);
  async  function rateMe(){
    await addReview("recipes",recipe.recipe_id)
      }
  return loading ? (
    <div>loading</div>
  ) : (
    <>
      <div
        className={`${styles.h_dive}`}
        style={{
          display: "flex",
          justify_Content: "space-between",
          flexDirection: "row-reverse",
          alignItems: "flex-start",
        }}
      >
        <div className={`${styles.h_div} ${styles.ONE}`}>
          <h1 className={`${styles.h_h1}`}>اسم الوصفة</h1>
          <br />
          <h4 className={`${styles.h_h4}`}>{recipe?.recipe_name}</h4>
          <p className="float-left">{recipe?.category_name}</p>
          <br />
          <h4 className={`${styles.h_h4}`}>
            عدد الكربوهيدرات:{" "}
            <span className={`${styles.h_span}`}>{recipe?.recipe_carb}</span>
          </h4>
          <br />
          <h3 className={`${styles.h_h3}`} style={{ display: "block" }}>
            المكونات
          </h3>
          <br />
          {recipe?.ingredients?.split("##").map((val) => (
            <>
              <p
                key={val}
                style={{ fontSize: "24px" }}
                className={`${styles.h_p} `}
              >
                {val}{" "}
              </p>
              <br />
            </>
          ))}
          <br />
          <h3 className={`${styles.h_h3}`} style={{ display: "block" }}>
            طريقة التحضير
          </h3>
          <br />
          {recipe?.instructions?.split("##").map((val) => (
            <>
              <p
                key={val}
                style={{ fontSize: "24px" }}
                className={`${styles.h_p} `}
              >
                {val}{" "}
              </p>
              <br />
            </>
          ))}
          <br />
          {/* <a target="_blank" href={`${baseUrl+"get/"+recipe.recipe_url}`} >تحميل الكتاب</a> */}
          <h2 className={`${styles.h_h2}`}>التقييم</h2>
          <span className={`${styles.h_span}`}>
            {rating.length==1?rating[0].review_rating: rating?.reduce(
              (total, num) => total.review_rating + num.review_rating
            ) / rating?.length || 0}
            /10
          </span>
          <br />
        </div>
<div 
        style={{width:"50vw"}}
        >
        <img
                style={{width:"100%"}}

          className={`${styles.h_img}`}
          dir="ltr"
          src={baseUrl + "get/" + recipe?.recipe_photo}
          alt="صورة الوصفه"
        />
         <br />
             
            </div>
            </div>

      <div className={`${styles.h_dive}`}>
        <h2 className={`${styles.h_h2}`}>التقيمات</h2>
        {rating.filter((rating)=>rating.user_id==user.userId ).length !=1?<div className="mx-10 ">
                    <hr />
                    <StarRating  maxRating={5} onSetRating={onRateChange} size="28px"  />
                    <br />
                   
                    <br />
                    <textarea
          style={{ width: "100%", backgroundColor: "white" }}
          dir="rtl"
          className={styles.h_textarea}
          placeholder="أضف تقيمك"
        onChange={(e)=>onCommentChange(e.target.value)}></textarea>
        <br style={{ height: "1px" }} />
        {myReview.review_rating?
          <button onClick={rateMe} className={`${styles.h_button} ${styles.four}`}>
          أضف تقييم
        </button>:null}
       
                    
                    </div>
                    :null}

      </div>
      <br />
      <br />
      <br />
      <br />
      <div className={`${styles.h_dive}`}>
        <h2 className={`${styles.h_h2}`}>التعليقات</h2>
        {rating?.map((comment) => (
          <>
            <div
              key={comment.comment_id}
              className={`${styles.h_dive} ${styles.comment}`}
            >
              <h3 className={`${styles.h_h3}`}>
                <img
                  className={`${styles.h_img} ${styles.avatar}`}
                  src={baseUrl + "get/" + comment.photo}
                  alt="Avatar"
                />
                <div className="flex flex-col">
                  {comment.username}

                  <Badge
                    classBg={
                      comment.role == "patient"
                        ? "bg-yellow-300"
                        : "bg-green-300"
                    }
                    classColor="text-black"
                  >
                    {comment.role}
                  </Badge>
                </div>
              </h3>
              <p className={`${styles.h_p} ${styles.five}`}>
                {comment.review_content}
              </p>
              <div className="flex justify-around">
                <span>
                  date {new Date(comment.comment_date).toDateString()}
                </span>
                <span>
                  full name {comment.first_name + " " + comment.last_name}
                </span>
              </div>
            </div>
            <hr />
          </>
        ))}
      </div>
    </>
  );
}

export default RecipePage;