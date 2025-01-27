import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Popover from "../popover/popover";
import CircleAvatar from "../circleAvatar/CircleAvatar";
import baseUrl from "../../const/const";
import Badge from "../Badge/Badge";

function NavBar() {
  const { isAuthenticated, logout,user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="max-w-screen-2xl mx-auto px-4 ">
      <nav className="w-full py-6">
        <ul className="flex flex-row ">
          <li>
            <NavLink className={"p-6 mr-7 font-bold"} to="/app/home">
              😁 home
            </NavLink>
          </li>
          <li></li>
          <li>
            <NavLink className={"p-6 text-gray-300"} to="/app/medicine">
              Medicines
            </NavLink>
          </li>

          <li>
            <NavLink className={"p-6 text-gray-300"} to="blog">
              Blog
            </NavLink>
          </li>

          <li className="ml-auto  ">
            <ul>
              <li>
              
                <Popover element={<div className="flex gap-4">
                    <div >
                        <h5>{user.firstName}</h5>
                        <Badge classBg="bg-yellow-300" classColor="text-black">
                        {user.role}
                        </Badge>
                    </div>
                    {/* <CircleAvatar src={baseUrl+"get/"+user.photo}/> */}
                </div>}>

                  <Link className={"p-8  text-gray-300"} to="/contact">
                    Contact
                  </Link>
                  <hr className="mt-4"/>
              <button
                onClick={() => {
                  localStorage.removeItem("jwt_token");
                  logout();
                }}
                className="pb-1 pt-4  px-8 cursor-pointer text-gray-300"
              >
                Logout
              </button>
                </Popover>


              </li>
            </ul>
            
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
