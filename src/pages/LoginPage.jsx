import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/inputField/InputField";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function LoginPage() {
  const navigate= useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login,logged,isAuthenticated,isLoading } = useAuth();
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
              navigate("/app" ,{replace: true})
            }
          }catch(e){
            console.log(e)
          }
        }
      }else{
        navigate("/app",{replace: true})
      }
    }
    ,[isAuthenticated,logged,navigate])
  function handleLogin(e) {
    e.preventDefault();
    if (username && password){ 
      login(username, password);
    }

  }
  return (
    <div className="max-w-screen-xl mx-auto px-4 ">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>

          <form className="flex flex-col gap-y-2" onSubmit={handleLogin}>
            <InputField type={"text"} placeholder="username" inHeight={"43"} width={"100%"} setValue={setUsername} value={username}/>
            <br/>
            <InputField type={"password"} placeholder="password" inHeight={"43"} width={"100%"} setValue={setPassword} value={password} />
       
            <div className="flex items-center justify-between flex-wrap ">
              <label
                htmlFor="remember-me"
                className="text-sm text-gray-900 cursor-pointer"
              >
                <input type="checkbox" id="remember-me" className="mr-2" />
                Remember me
              </label>
             
              <p className="text-gray-900 mt-4 pt-8">
                Don&apos;t have an account?
                <Link
                  to="/signup"
                  className="text-sm text-blue-500 -200 hover:underline mt-4"
                >
                  Signup
                </Link>
              </p>
            </div>
           <h1>hi  {isLoading ? <p>Loading...</p>:"hi"}</h1>
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
