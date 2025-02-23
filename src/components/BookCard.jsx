import {  Link } from "react-router-dom";

function BookCard({ src, title, summary  ,linkPage}) {
  return (
    <div className="book-card-column rounded-t-2xl">
      <div className="book-card">
        <Link to={linkPage.toString()} >
        <img src={src} className="min-w-40 min-h-40  rounded-t-2xl w-full"   />

        </Link>
        
      
        <div className="book-card-container">
          <h4 className="mt-4">
            <Link to={linkPage}>  {title?title:"no title" }</Link>
          </h4>
         
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
