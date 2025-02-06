import { Link } from "react-router-dom";

function MedSkeleton({
  src,
  name,
  summary,
  category,
  price,
  date,
  linkEdit,
  linkName,
  linkCat,
}) {
  return (
    <div>
      {/* <!-- CARD 1 --> */}
      <div className="rounded overflow-hidden shadow-lg flex flex-col">
        <a></a>
        <div className="relative">
          <img
            className="skeleton"
            style={{
              width: "30vw",
              height: "180px",
              borderRadius: "20px 20px 0 0",
              objectFit: "cover",
            }}
          />
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>

          <div className="text-xs absolute top-0 right-0  px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out w-32 h-5 skeleton"></div>
        </div>
        <div className="px-6 py-4 mb-auto">
          <div className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2 w-40 h-6 skeleton "></div>
          <p className="text-gray-500 text-sm w-48 h-5 mb-5 skeleton"></p>
          <p className="text-gray-500 text-sm w-48 h-5 skeleton"></p>
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
            <span className="ml-1 w-24 h-4 skeleton"></span>
          </span>

          <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
            $<span className="ml-1 w-24 h-4 skeleton"></span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default MedSkeleton;