import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Popover from "./Popover";
import { BookOpenIcon, HomeIcon } from "@heroicons/react/24/outline";
import CircleAvatar from "./CircleAvatar";
import Badge from "./Badge";
import PillsIcon from "./myIcons/PillsIcon";
import CakeIcon from "./myIcons/CakeIcon";
import baseUrl from "../const/const";
import { useEffect, useState } from "react";
import useUser from "../hooks/userHooks";

function NavBar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [myUser,setMyUser]=useState()
  const {getUserById}=useUser()
  const [isLoading,setIsLoading] = useState(true)
   useEffect(() =>{
    async function loadUser(){
      try{
        setIsLoading(true);
        const data=await getUserById(user.userId)
        setMyUser(data.user)
        setIsLoading(false)
      }catch{
        console.log('error')
      }
    }
    loadUser()
     },[])
     if(isLoading)return <div>Loading...</div>
  return (
    <div className="max-w-screen-2xl mx-auto ">
      <nav className="w-full py-6">
        <ul className="flex flex-row ">
          <li>
            <NavLink className={"p-6 ml-2 font-bold"} to="/app/home">
              <HomeIcon className="myNavIcon" />
              home
            </NavLink>
          </li>
          <li>
            <NavLink className={"p-6 text-gray-300"} to="/app/medicine">
              <PillsIcon className={"myNavIcon"} /> Medicines
            </NavLink>
          </li>

          {myUser.role !="pharmacy"?<>

          <li>
            <NavLink className={"p-6 text-gray-300"} to="recipes">
              <CakeIcon className={"myNavIcon"} />
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink className={"p-6 text-gray-300"} to="books">
              <BookOpenIcon className={"myNavIcon"} />
              Books
            </NavLink>
          </li>
          </>
          :null
          }

          <li className="ml-auto  ">
            <ul>
              <li>
                <Popover 
                  element={
                    <div className="flex gap-4">
                      <div>
                        <h5>{myUser.first_name}</h5>
                        <Badge classBg={myUser.role=="patient"?"bg-yellow-300":"bg-green-300"} classColor="text-black">
                          {user.role}
                        </Badge>
                      </div>
                      <CircleAvatar src={baseUrl+"get/"+myUser.photo}/>
                    </div>
                  }
                >
                
                  <Link className={"p-8  text-gray-300"} to="profile">
                    الصفحة الشخصية
                  </Link>
                  <hr className="mt-4" />
                  <button
                    onClick={() => {
                      localStorage.removeItem("jwt_token");
                      logout();
                    }}
                    className="pb-1 pt-4  px-8 cursor-pointer text-gray-300"
                  >
                    تسجيل الخروج
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
