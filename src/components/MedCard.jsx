import { CurrencyDollarIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

function MedCard({
  src,
  name,
  summary,
  category,
  price,
  date,
  linkEdit,
  linkCat,
  setCart,
  med_id,
  myMed
}) {
  return (
    <div>
      {/* <!-- CARD 1 --> */}
      <div className="rounded overflow-hidden shadow-lg flex flex-col">
        <a></a>
        <div className="relative">
          <Link to={linkEdit}>
            <img
              className="w-full max-h-95 object-cover"
              src={
                src
                  ? src
                  : "/imgs/medicine.jpeg"
              }
              alt="Sunset in the mountains"
            />
            <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
          </Link>
          <Link to={linkCat}>
            <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
              {category ? category : "Not Categorized"}
            </div>
          </Link>
        </div>
        <div className="px-6 py-4 mb-auto">
          <Link
           to={linkEdit}
            className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
          >
            {name ? name : "No name defined"}
          </Link>
          <p className="text-gray-500 text-sm">
            {summary ? summary : "NO Data Yet"}
          </p>
          <button
            className="text-blue-500 text-sm float-right cursor-pointer pt-2"
            onClick={() => setCart(myMed)}
          >
            اضف الي العربه
          </button>
        </div>
        <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
        <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
            <svg
              height="13px"
              width="13px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style={{ enableBackground: "new 0 0 512 512" }}
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                </g>
              </g>
            </svg> 
            <span className="w-1"> </span>
            <span className="ml-1">{date ? date : "6 mins ago"}</span>
          </span>

          <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
            <span className="ml-1"> {price ? price : "0"} </span>
            <span className="w-1"> </span>
             LE
          </span>

        
        </div>
      </div>
    </div>
  );
}

export default MedCard;
