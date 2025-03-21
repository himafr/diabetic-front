import { useEffect, useState } from "react";
import styles from "./BookPage.module.css";
import { useParams } from "react-router-dom";
import baseUrl from "../../const/const";
import Badge from "../../components/Badge";
import { useAuth } from "../../context/AuthContext";
import useBooks from "../../hooks/booksHooks";
import StarRating from "../../components/starRating/StarRating";
import useReview from "../../hooks/reviewHooks";

function BookPage() {
    const {user}=useAuth()

  const [book, setBook] = useState([]);
  const [rating, setRating] = useState([{review_rating:0,review_content:""}]);
  const { id } = useParams();
  const { loadBooksById } = useBooks();
  const {addReview,myReview,onCommentChange,onRateChange}=useReview()
  const [loading, setLoading] =useState(true);
  useEffect(() => {
    setLoading(true);
    loadBooksById(id)
      .then((data) => {
          console.log(data)
        setBook(data.book);
        if(data.review.length!=0)setRating(data.review);
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
      
      </div>
</div>

<div className={`${styles.h_dive}`}>
      {/* بشوف اذا اضاف المستخدم تعليق من قبل ام لا  */}
      {/* لو لا هنعرض الفورم الخاصه ب الاضافه  */}
        {rating.filter((rating) => rating.user_id == user.userId).length !=
        1 ? (
          
          <div className="mx-10 ">
            <h2 className={`${styles.h_h2}`}>التقيمات</h2>
            <hr />
            <StarRating maxRating={5} onSetRating={onRateChange} size="28px" />
            <br />

            <br />
            <textarea
              style={{ width: "100%", backgroundColor: "white" }}
              dir="rtl"
              className={styles.h_textarea}
              placeholder="أضف تقيمك"
              onChange={(e) => onCommentChange(e.target.value)}
            ></textarea>
            <br style={{ height: "1px" }} />
            {myReview.review_rating ? (
              <button
                onClick={rateMe}
                className={`${styles.h_button} ${styles.four}`}
              >
                أضف تقييم
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
      <br />
      <br />
      <br />
      <br />
      {/* مكان عرض جميع التعليقات  */}
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

              <div className="float-end">
                {Array.from({ length: 5 }, (_, index) =>
                  parseInt(comment.review_rating) > index ? (
                    <span
                      style={{
                        color: "#f39c12",
                        fontSize: "20px",
                        marginLeft: "5px",
                      }}
                      key={index}
                    >
                      &#9733;
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "#f39c12",
                        fontSize: "20px",
                        marginLeft: "5px",
                      }}
                      key={index}
                    >
                      &#9734;
                    </span>
                  )
                )}
              </div>
              <br />
              <p className={`${styles.h_p} ${styles.five}`}>
                {comment.review_content}
              </p>
              <div className="flex justify-around">
                <span>date {new Date(comment.review_date).toDateString()}</span>
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

export default BookPage;
