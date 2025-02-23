import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PlusButton from "../components/PlusButton";
import { Link } from "react-router-dom";
import useMeds from "../hooks/medsHooks";
import MedCard from "../components/MedCard";
import { useAuth } from "../context/AuthContext";
import MedSkeleton from "../state/loading_state/MedSkeleton";
import { XMarkIcon } from "@heroicons/react/16/solid";
import Cart from "../components/Cart";
import baseUrl from "../const/const";
import useCart from "../hooks/cartHooks";

function MedicinePage() {
  const { user } = useAuth();
  const [meds, setMeds] = useState([]);
  const { loadMeds } = useMeds();
  const [page, setPage] = useState(1);
  const [totalMeds, setTotalMeds] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {setCartOpen,cart,cartOpen,addToCart,changeQtyNum,addQTYCart,minusQTYCart,removeFromCart}=useCart();
  

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

 
  return !cartOpen ? (
    <div className="flex flex-col">
      <header>
        {user.role === "pharmacy" ? (
          <Link to="add">
            <PlusButton className="float-left mr-4" />
          </Link>
        ) : (
          <div
            className="relative float-left ml-8"
            onClick={() => {
              setCartOpen((val) => !val);
            }}
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width={30}
              height={30}
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"
              />
            </svg>
            <span className="absolute bg-red-600 w-6 h-6 flex justify-center items-center rounded-4xl text-white -right-5 top-4">
              {cart.length !== 0
    ? cart.length !== 1
        ? cart.reduce((total, val) => total + val.qty, 0)
        : cart[0].qty
    : 0}
            </span>
          </div>
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
                    setCart={addToCart}
                    med_id={med.med_id}
                    linkEdit={
                      user.role == "pharmacy"
                        ? `edit/${med.med_id}`
                        : `${med.med_id}`
                    }
                    myMed={med}
                    linkName={
                      user.role == "pharmacy"
                        ? `edit/${med.med_id}`
                        : `${med.med_id}`
                    }
                    category={med.med_cat}
                    src={med.med_photo != "not set"
                ? `${baseUrl}get/${med.med_photo}`
                : false}
                    name={med.med_name}
                    key={med.med_id}
                    price={med.med_price}
                    summary={med.med_summary}
                    date={new Date(med.med_created_at).toDateString()}
                  />
                ))}
              </div>
            </InfiniteScroll>
            {error && (
              <p className="text-center mt-4" style={{ color: "red" }}>
                {error.message}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  ) : (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          عربة التسوق
          <XMarkIcon
            className="float-right w-8 text-red-600"
            onClick={() => {
              setCartOpen((val) => !val);
            }}
          />
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cart.map((med) => (
                <Cart
                qty={med.qty}
                src={med.med_photo != "not set"
                ? `${baseUrl}get/${med.med_photo}`
                : false}
                changeQty={[addQTYCart,minusQTYCart,changeQtyNum]}
                  med_id={med.med_id}
                  removeCart={removeFromCart}
                  name={med.med_name}
                  key={med.med_id}
                  price={med.med_price}
                  summary={med.med_summary}
                  date={new Date(med.med_created_at).toDateString()}
                />
              ))}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                ملخص الطلبات
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      السعر الاصلي
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                    {cart.length !== 0
    ? cart.length !== 1
        ? cart.reduce((total, val) => total + val.qty*val.med_price, 0)
        : cart[0].qty*cart[0].med_price
    : 0}
                    </dd>
                  </dl>

                  {/* <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-600">
                      -$299.00
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Store Pickup
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $99
                    </dd>
                  </dl> */}

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      الضرائب
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      0LE 
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    المجموع
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    
                  </dd>
                </dl>
              </div>
              {cart.length !== 0
    ? cart.length !== 1
        ? cart.reduce((total, val) => total + val.qty*val.med_price, 0)
        : cart[0].qty*cart[0].med_price
    : 0}
              <a
                href="#"
                className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                التحقق و الشراء
              </a>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  او
                </span>
                <a
                  href="#"
                  onClick={()=>setCartOpen(false)}
                  title=""
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                >
                  اكمل التسوق
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default MedicinePage;
