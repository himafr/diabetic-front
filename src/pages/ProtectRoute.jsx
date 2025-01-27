import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function ProtectRoute({children}) {
    const navigate =useNavigate();
    const { logged,isAuthenticated } = useAuth();
      useEffect(
        function(){
          if(!isAuthenticated){
            if(localStorage.jwt_token){
              console.log("start")
              try{
                const user = jwtDecode(localStorage.jwt_token);
                console.log(user)
                if(user){
                  logged(user);
                }
              }catch(e){
                console.error(e);
                localStorage.removeItem("jwt_token");
                navigate("/login",{replace: true})
              }
            }else{
                navigate("/login",{replace: true})
            }
          }
        }
        ,[isAuthenticated,logged,navigate])

    return (
        <div>
            {isAuthenticated? children:null}
        </div>
    )
}

export default ProtectRoute
