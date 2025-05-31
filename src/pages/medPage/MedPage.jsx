/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useMeds from "../../hooks/medsHooks";
import styles from "./MedPage.module.css";
import { useParams } from "react-router-dom";
import baseUrl from "../../const/const";
import useCart from "../../hooks/cartHooks";
import Badge from "../../components/Badge";
import { useAuth } from "../../context/AuthContext";
import useReview from "../../hooks/reviewHooks";
import StarRating from "../../components/starRating/StarRating";

function MedPage() {
  const { user } = useAuth();
  console.log(user);
  const [med, setMed] = useState([]);
  const [rating, setRating] = useState([
    { review_rating: 0, review_content: "" },
  ]);
  const [cart, setCart] = useState({});
  const [error, setError] = useState("");
  const { id } = useParams();
  const { addToCart } = useCart();
  const { loadMedById } = useMeds();
  const [loading, setLoading] = useState(true);
  const { addReview, myReview, onCommentChange, onRateChange } = useReview();

  useEffect(() => {
    setLoading(true);
    loadMedById(id)
      .then((data) => {
        setMed(data.med);
        if (data.review.length != 0) setRating(data.review);
        setCart(data.med);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(setLoading(false));
  }, [id]);
  async function rateMe() {
    await addReview("meds", med.med_id);
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
          <span className={`${styles.h_span}`}>
            {rating.length == 1
              ? rating[0].review_rating
              : rating?.reduce(
                  (total, num) => total.review_rating + num.review_rating
                ) / rating?.length || 0}
            /10
          </span>
        </div>
        <div style={{ width: "50vw" }}>
          <img
            style={{ width: "100%" }}
            className={`${styles.h_img}`}
            dir="ltr"
            src={baseUrl + "get/" + med?.med_photo}
            alt="صورة العلاج"
          />
          <br />
        </div>
      </div>

      <div className={`${styles.h_dive}`}>
        <h2 className={`${styles.h_h2}`}>التقيمات</h2>
        {rating.filter((rating) => rating.user_id == user.userId).length !=
        1 ? (
          <div className="mx-10 ">
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
      <div className={`${styles.h_dive}`}>
        <h2 className={`${styles.h_h2}`}>التعليقات</h2>
        {rating?.map((comment, index) => (
          <>
            <div key={index} className={`${styles.h_dive} ${styles.comment}`}>
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

export default MedPage;
