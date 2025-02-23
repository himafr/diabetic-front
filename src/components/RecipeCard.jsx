import {  Link } from "react-router-dom";

function RecipeCard({ src, name, instructions ,category ,linkPage}) {
  return (
    <div className="book-card-column rounded-t-2xl">
      <div className="book-card">
        <Link to={linkPage.toString()} >
        <img src={src} className="min-w-40 min-h-40  rounded-t-2xl w-full"   />

        </Link>
        
      
        <div className="book-card-container">
          <div>
            <div
              style={{ margin: "10px" }}
            >{category?category:"no category"}</div>
          </div>
          <h4>
            <Link to={linkPage.toString()}>  {name?name:"no name" }</Link>
          </h4>
          {/* <p className="book-name pt-3">
          vv
          </p> */}
          <p className="book-instructions py-2">
          {instructions?instructions.replace(/##/g," "): " no instructions "}
          </p>
          <p className="mb-4">example@example.com</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
