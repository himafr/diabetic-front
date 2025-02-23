import { useEffect, useState } from "react";
import useMeds from "../../hooks/medsHooks";
import styles from "./MedPage.module.css";
import { useParams } from "react-router-dom";
import baseUrl from "../../const/const";
import useCart from "../../hooks/cartHooks";
import Badge from "../../components/Badge";
import { useAuth } from "../../context/AuthContext";
import useComments from "../../hooks/commentHooks";

function MedPage() {
    const {user}=useAuth()
    console.log(user)
  const [med, setMed] = useState([]);
  const [commentsList, setCommentsList] = useState([{}]);
  const [rating, setRating] = useState([{review_rating:10}]);
  const [cart, setCart] = useState({});
  const [error, setError] = useState("");
  const { id } = useParams();
  const { addToCart } = useCart();
  const { loadMedById } = useMeds();
  const [loading, setLoading] =useState(true);
  const {addComment,onCommentChange}=useComments()

  useEffect(() => {
    setLoading(true);
    loadMedById(id)
      .then((data) => {
        setMed(data.med);
        setCommentsList(data.comments);
        if(data.review.length!=0)setRating(data.review);
        setCart(data.med);
      })
      .catch((err) => {
        setError(err.message);
      }).finally(
        setLoading(false)
      );
  }, [id]);
  return loading?<div>loading</div>:(
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
          <h1 className={`${styles.h_h1}`}>اسم العلاج</h1>
          <br />
          <h4 className={`${styles.h_h4}`}>{med?.med_name}</h4>
          <br />
          <h3 className={`${styles.h_h3}`} style={{ display: "block" }}>
            وصف عن العلاج
          </h3>
          <br />
          <p className={`${styles.h_p}`}>{med?.med_summary} </p>
          <br />
          <h4 className={`${styles.h_h4}`}>
            السعر: <span className={`${styles.h_span}`}>{med?.med_price}</span>
          </h4>
          <br />
          <button
            onClick={() => {
              addToCart(cart);
            }}
            className={`${styles.h_button} ${styles.two}`}
          >
            اضافة إلى عربة الشراء
          </button>
          <h2 className={`${styles.h_h2}`}>التقييم</h2>
          <span className={`${styles.h_span}`}>{rating?.reduce((total,num)=> total.review_rating+num.review_rating)/rating?.length||0}/10</span>
        </div>

        <img
          className={`${styles.h_img}`}
          dir="ltr"
          src={baseUrl + "get/" + med?.med_photo}
          alt="صورة العلاج"
        />
      </div>

      <div className={`${styles.h_dive}`}>
        <h2 className={`${styles.h_h2}`}>التعليقات</h2>
        <textarea
          style={{ width: "100%", backgroundColor: "white" }}
          dir="rtl"
          className={styles.h_textarea}
          placeholder="أضف تعليقك"
        onChange={(e)=>onCommentChange(e.target.value)}></textarea>
        <br style={{ height: "1px" }} />
        <button onClick={()=>addComment("meds",med.med_id)} className={`${styles.h_button} ${styles.four}`}>
          أضف تعليق
        </button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className={`${styles.h_dive}`}>
        <h2 className={`${styles.h_h2}`}>التعليقات</h2>
        {
          commentsList?.map((comment) => (
<>
              <div className={`${styles.h_dive} ${styles.comment}`}>
                <h3 className={`${styles.h_h3}`}>
                  <img
                    className={`${styles.h_img} ${styles.avatar}`}
                    src={baseUrl+"get/"+comment.photo}
                    alt="Avatar"
                  />
                  <div className="flex flex-col">

                  {comment.username}
                  
                 <Badge classBg={comment.role=="patient"?"bg-yellow-300":"bg-green-300"} classColor="text-black">
                          {comment.role}
                        </Badge>
                  </div>
                </h3>
                <p className={`${styles.h_p} ${styles.five}`}>{comment.comment_content}</p>
                <div className="flex justify-around">
                    <span >date {new Date(comment.comment_date).toDateString()}</span>
                    <span>full name {comment.first_name + " "+comment.last_name}</span>
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

export default MedPage;

{
  /* <div className={`${styles.h_dive} ${styles.comment}`} >
<h3 className={`${styles.h_h3}`}>
    <img className={`${styles.h_img} ${styles.avatar}`} src="./ahmed.jpg" alt="Avatar"  /> إبراهيم أحمد
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
