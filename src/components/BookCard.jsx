import {  Link } from "react-router-dom";

function BookCard({ src, title, summary ,category ,linkPage}) {
  return (
    <div className="book-card-column rounded-t-2xl">
      <div className="book-card">
        <Link to={linkPage.toString()} >
        <img src={src} className="min-w-40 min-h-40  rounded-t-2xl"   />

        </Link>
        
      
        <div className="book-card-container">
          <div>
            <div
              style={{ margin: "10px" }}
            >{category?category:"no category"}</div>
          </div>
          <h4>
            <div> don&apos;t know</div>
          </h4>
          <p className="book-title pt-3">
           {title?title:"no title" }
          </p>
          <p className="book-summary py-2">
          {summary?summary: " no summary "}
          </p>
          <p className="mb-4">example@example.com</p>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
