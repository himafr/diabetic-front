import { useEffect, useState } from "react";
import styles from "./RecipePage.module.css";
import { useParams } from "react-router-dom";
import baseUrl from "../../const/const";
import Badge from "../../components/Badge";
import useComments from "../../hooks/commentHooks";
import useRecipe from "../../hooks/recipesHooks";

function RecipePage() {
  const [recipe, setRecipe] = useState([]);
  const [commentsList, setCommentsList] = useState([{}]);
  const [rating, setRating] = useState([{ review_rating: 10 }]);
  const { id } = useParams();
  const { loadRecipesById } = useRecipe();
  const [loading, setLoading] = useState(true);
  const { addComment, onCommentChange } = useComments();

  useEffect(() => {
    setLoading(true);
    loadRecipesById(id)
      .then((data) => {
        console.log(data);
        setRecipe(data.recipe);
        setCommentsList(data.comments);
        if (data.review.length != 0) setRating(data.review);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(setLoading(false));
  }, [id]);
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
          <h1 className={`${styles.h_h1}`}>اسم الكتاب</h1>
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
            {rating?.reduce(
              (total, num) => total.review_rating + num.review_rating
            ) / rating?.length || 0}
            /10
          </span>
          <br />
        </div>

        <img
          className={`${styles.h_img}`}
          dir="ltr"
          src={baseUrl + "get/" + recipe?.recipe_photo}
          alt="صورة الكتاب"
        />
      </div>

      <div className={`${styles.h_dive}`}>
        <h2 className={`${styles.h_h2}`}>التعليقات</h2>
        <textarea
          style={{ width: "100%", backgroundColor: "white" }}
          dir="rtl"
          className={styles.h_textarea}
          placeholder="أضف تعليقك"
          onChange={(e) => onCommentChange(e.target.value)}
        ></textarea>
        <br style={{ height: "1px" }} />
        <button
          onClick={() => addComment("recipes", recipe.recipe_id)}
          className={`${styles.h_button} ${styles.four}`}
        >
          أضف تعليق
        </button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className={`${styles.h_dive}`}>
        <h2 className={`${styles.h_h2}`}>التعليقات</h2>
        {commentsList?.map((comment) => (
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
                {comment.comment_content}
              </p>
              <div className="flex justify-around">
                <span>
                  date {new Date(comment.comment_date).toDateString()}
                </span>
                <span>
                  full name {comment.first_name + " " + comment.last_name}
                </span>
                {/* {user?.userId==comment?.user_id&&<button className="cursor-pointer text-red-500"  
                    onClick={()=>{deleteComment(comment.comment_id)}}>delete comment</button>} */}
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

{
  /* <div className={`${styles.h_dive} ${styles.comment}`} >
<h3 className={`${styles.h_h3}`}>
    <img className={`${styles.h_img} ${styles.avatar}`} src="./ahrecipe.jpg" alt="Avatar"  /> إبراهيم أحمد
</h3>
<div className={`${styles.h_dive} ${styles.stars}`} >
    <span className={`${styles.h_span} ${styles.star} `}>&#9733;</span>
    <span className={`${styles.h_span} ${styles.star} `}>&#9733;</span>
    <span className={`${styles.h_span} ${styles.star} `}>&#9733;</span>
    <span className={`${styles.h_span} ${styles.star} `}>&#9734;</span>
    <span className={`${styles.h_span} ${styles.star} `}>&#9734;</span>
</div>
<p className={`${styles.h_p} ${styles.five}`} >علاج مريح جدا</p>
<button className={`${styles.h_button} ${styles.like_btn}`} >
    <span className={`${styles.h_span} ${styles.like_icon}`} >&#128077;</span>
</button>
<button className={`${styles.h_button} ${styles.unlike_btn}`} >
    <span className={`${styles.h_span} ${styles.unlike_icon} `} >&#128078;</span>
</button>
      
      <button className={`${styles.h_button} ${styles.reply_btn}`} >Reply</button>
</div>
<hr />


<div className={`${styles.h_dive} ${styles.comment}`} >
<h3 className={`${styles.h_h3}`}>
    <img className={`${styles.h_img} ${styles.avatar}`} src="IMG-20250216-WA0011(1).jpg" alt="Avatar"  /> أحمد محمد
</h3>
<div className={`${styles.h_dive} ${styles.stars}`} >
    <span className={`${styles.h_span} ${styles.star} `}>&#9733;</span>
    <span className={`${styles.h_span} ${styles.star} `}>&#9733;</span>
    <span className={`${styles.h_span} ${styles.star} `}>&#9733;</span>
    <span className={`${styles.h_span} ${styles.star} `}>&#9733;</span>
    <span className={`${styles.h_span} ${styles.star} `}>&#9733;</span>
</div>
<p className={`${styles.h_p} ${styles.five}`} >علاج مفيد</p>
<button className={`${styles.h_button} ${styles.like_btn}`} >
    <span className={`${styles.h_span} ${styles.like_icon}`} >&#128077;</span>
</button>
<button className={`${styles.h_button} ${styles.unlike_btn}`} >
    <span className={`${styles.h_span} ${styles.unlike_icon} `} >&#128078;</span>
</button>
      
      <button className={`${styles.h_button} ${styles.reply_btn}`} >Reply</button>
</div>
<hr />

<div className={`${styles.h_dive} ${styles.comment}`} >
<h3 className={`${styles.h_h3}`}>
    <img className={`${styles.h_img} ${styles.avatar}`} src="./mabrouk.jpg" alt="Avatar"/> مبروك 
</h3>
<div className={`${styles.h_dive} ${styles.stars}`} >
    <span className={`${styles.h_span} ${styles.star} `}>&#9733;</span>
    <span className={`${styles.h_span} ${styles.star} `}>&#9733;</span>
    <span className={`${styles.h_span} ${styles.star} `}>&#9733;</span>
    <span className={`${styles.h_span} ${styles.star} `}>&#9734;</span>
    <span className={`${styles.h_span} ${styles.star} `}>&#9734;</span>
</div>
<p className={`${styles.h_p} ${styles.five}`} >علاج مفيد</p>
<button className={`${styles.h_button} ${styles.like_btn}`} >
    <span className={`${styles.h_span} ${styles.like_icon}`} >&#128077;</span>
</button>
<button className={`${styles.h_button} ${styles.unlike_btn}`} >
    <span className={`${styles.h_span} ${styles.unlike_icon} `} >&#128078;</span>
</button>
      
      <button className={`${styles.h_button} ${styles.reply_btn}`} >Reply</button>


</div> */
}
