import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PlusButton from "../components/PlusButton";
import { Link } from "react-router-dom";
import useMeds from "../hooks/medsHooks";
import MedCard from "../components/MedCard";
import { useAuth } from "../context/AuthContext";
import MedSkeleton from "../state/loading_state/MedSkeleton";

function MedicinePage() {
  const { user } = useAuth();
  const [meds, setMeds] = useState([]);
  const [page, setPage] = useState(1);
  const [totalMeds, setTotalMeds] = useState(0);
  const { loadMeds } = useMeds();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMoreMeds = async () => {
    try {
      const [newMeds, totalMedsCount] = await loadMeds({ page, limit: 9 });
      setMeds((prevMeds) => [...prevMeds, ...newMeds]);
      setTotalMeds(totalMedsCount);
      setPage((prevPage) => prevPage + 1);
    } catch (e) {
      e.message = "something went wrong please try again latter";
      setError(e);
    }
  };

  useEffect(() => {
    async function getInitialMeds() {
      setLoading(true);
      try {
        const [initialMeds, totalMedsCount] = await loadMeds({
          page: 0,
          limit: 9,
        });
        setMeds(initialMeds);
        setTotalMeds(totalMedsCount);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        e.message = "No Medicine Found";
        setError(e);
      }
    }
    getInitialMeds();
  }, []);

  return (
    <div className="flex flex-col">
      <header>
        {user.role === "pharmacy" && (
          <Link to="add">
            <PlusButton className="float-right mr-4" />
          </Link>
        )}
      </header>

      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <MedSkeleton />
            <MedSkeleton />
            <MedSkeleton />
            <MedSkeleton />
            <MedSkeleton />
            <MedSkeleton />
          </div>
        ) : (
          <>
            <InfiniteScroll
              dataLength={meds.length}
              next={loadMoreMeds}
              hasMore={meds.length < totalMeds}
              loader={<p className="text-center mt-4">Loading more meds...</p>}
              endMessage={
                <p className="text-center mt-4">No more meds to display</p>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {meds.map((med) => (
                  <MedCard
                    linkEdit={`edit/${med.med_id}`}
                    name={med.med_name}
                    key={med.med_id}
                    price={med.med_price}
                    summary={med.med_summary}
                  />
                ))}
              </div>
            </InfiniteScroll>
            {error && (
              <p className="text-center mt-4" style={{ color: "red" }}>
                {" "}
                {error.message}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default MedicinePage;
