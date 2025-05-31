import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard";
import BooksSkeleton from "../../state/loading_state/booksSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import useBooks from "../../hooks/booksHooks";
import baseUrl from "../../const/const";

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const { loadBooks } = useBooks();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMoreBooks = async () => {
    try {
      const [newBooks, totalBooksCount] = await loadBooks({ page, limit: 6 });
      setBooks((prevBooks) => [...prevBooks, ...newBooks]);
      setTotalBooks(totalBooksCount);
      setPage((prevPage) => prevPage + 1);
    } catch (e) {
      e.message = "something went wrong please try again latter";
      setError(e);
    }
  };
  useEffect(() => {
    async function getInitialBooks() {
      setLoading(true);
      try {
        const [initialBooks, totalBooksCount] = await loadBooks({  page: 0,  limit: 6, });
        setBooks(initialBooks);
        setTotalBooks(totalBooksCount);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        e.message = "No Medicine Found";
        setError(e);
      } }
    getInitialBooks();
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 ">
      <div className="flex flex-wrap -mx-2 tm-row justify-center">
        {loading ? (
          <>
            <BooksSkeleton />
            <BooksSkeleton />
            <BooksSkeleton />
          </>
        ) : (
          <InfiniteScroll
            dataLength={books.length}
            next={loadMoreBooks}
            hasMore={books.length < totalBooks}
            loader={<p className="text-center mt-4">Loading more meds...</p>}
            endMessage={
              <p className="text-center mt-4">No more meds to display</p>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {books.map((book) => (
                <BookCard
                  summary={`${book.book_summary.substring(0, 200)}...`}
                  title={book.book_title}
                  key={book.book_id}
                  src={baseUrl + "get/" + book.book_photo}
                  linkPage={book.book_id}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
        {error && (
          <div className="text-center mt-4" style={{ color: "red" }}>
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default BooksPage;
