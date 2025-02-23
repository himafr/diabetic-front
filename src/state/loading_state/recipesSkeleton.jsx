function RecipesSkeleton() {
  return (
    <div className="book-card-column">
      <div className="book-card">
        <img className="skeleton" />
        <div className="book-card-container">
          <div>
            <div
              className=" w-40 h-5 skeleton"
              style={{ margin: "10px" }}
            ></div>
          </div>
          <h4>
            <div className=" w-44 h-5 skeleton"></div>
          </h4>
          <div className="book-title pt-3">
            <div className=" w-40 h-5 skeleton"></div>
          </div>
          <div className="book-summary py-2">
            <div className=" w-80 h-5 skeleton"></div>
          </div>
          <div className=" w-30 h-5 skeleton mb-4"></div>
        </div>
      </div>
    </div>
  );
}

export default RecipesSkeleton;
