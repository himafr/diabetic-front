import { useEffect, useState } from "react";
import styles from "./BookPage.module.css";
import { useParams } from "react-router-dom";
import baseUrl from "../../const/const";
import Badge from "../../components/Badge";
import { useAuth } from "../../context/AuthContext";
import useComments from "../../hooks/commentHooks";
import useBooks from "../../hooks/booksHooks";
import StarRating from "../../components/starRating/StarRating";
import useReview from "../../hooks/reviewHooks";

function BookPage() {
    const {user}=useAuth()

  const [book, setBook] = useState([]);
  const [commentsList, setCommentsList] = useState([{}]);
  const [rating, setRating] = useState([{review_rating:10}]);
  const { id } = useParams();
  const { loadBooksById } = useBooks();
  const {addReview,myRate,setMyRate}=useReview()
  const [loading, setLoading] =useState(true);
  const {addComment,onCommentChange}=useComments()
  useEffect(() => {
    setLoading(true);
    loadBooksById(id)
      .then((data) => {
          console.log(data)
        setBook(data.book);
        setCommentsList(data.comments);
        if(data.review.length!=0)setRating(data.review);
        console.log("rating.filter((rating)=>rating.user_id==user.userId ).length")
        console.log(rating.filter((rating)=>rating.user_id==user.userId ).length)
      })
      .catch((err) => {
        console.log(err.message);
      }).finally(
        setLoading(false)
      );
  }, [id]);

async  function rateMe(){
await addReview("books",book.book_id)
  }
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
          <h1 className={`${styles.h_h1}`}>اسم الكتاب</h1>
          <br />
          <h4 className={`${styles.h_h4}`}>{book?.book_title}</h4>
          <br />
          <h3 className={`${styles.h_h3}`} style={{ display: "block" }}>
            وصف عن الكتاب
          </h3>
          <br />
          <p className={`${styles.h_p}`}>{book?.book_desc} </p>
          <br />
          <h4 className={`${styles.h_h4}`}>
            الملخص: <span className={`${styles.h_span}`}>{book?.book_summary}</span>
          </h4>
          <br />
          <a target="_blank" href={`${baseUrl+"get/"+book.book_url}`} >تحميل الكتاب</a>
          <br />
          <h2 className={`${styles.h_h2}`}>التقييم</h2>
          <span className={`${styles.h_span}`}>{rating.length==1?rating[0].review_rating: rating?.reduce((total,num)=> total.review_rating+num.review_rating)/rating?.length||0}/10</span>
        </div>
<div 
        style={{width:"50vw"}}
        >

        <img
        style={{width:"100%"}}

          className={`${styles.h_img}`}
          dir="ltr"
          src={baseUrl + "get/" + book?.book_photo}
          alt="صورة الكتاب"
        />
        <br />
       {rating.filter((rating)=>rating.user_id==user.userId ).length !=1?<>
                    <hr />
                    <StarRating  maxRating={10} onSetRating={setMyRate} size="28px"  />
                    <br />
                    {myRate?<button className="text-amber-400 py-2 rounded-2xl hover:bg-amber-200  px-4 border-2" onClick={rateMe} >Rate </button>:null}
                    </>
                    :null}
      </div>
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
        <button onClick={()=>addComment("books",book.book_id)} className={`${styles.h_button} ${styles.four}`}>
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

export default BookPage;

{
  /* <div className={`${styles.h_dive} ${styles.comment}`} >
<h3 className={`${styles.h_h3}`}>
    <img className={`${styles.h_img} ${styles.avatar}`} src="./ahbook.jpg" alt="Avatar"  /> إبراهيم أحمد
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
