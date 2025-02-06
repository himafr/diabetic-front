import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/inputField/InputField";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Loader from "../components/Loader";

function LoginPage() {
 
  const navigate= useNavigate();
  const [error,setError]=useState(null)
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("pass1234@#Ge");
  const { login,logged,isAuthenticated,isLoading } = useAuth();
  const [loading,setLoading]=useState(isLoading);

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
 async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    if (username && password){
      try{
       await login(username, password);
      } catch(e){
        console.error(e);
        setLoading(false);
        setError(e.message);
        setTimeout(() => setError(null), 3000);
      }
    }

  }
  return (
    <div className="max-w-screen-2xl mx-auto px-4" >
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 " style={{marginTop:"0px"}}>Sign In</h1>

          <form className="flex flex-col gap-y-2" onSubmit={handleLogin}>
            <InputField type={"text"} placeholder="username" inHeight={"43"} width={"100%"} setValue={setUsername} value={username}/>
            <br/>
            <InputField type={"password"} placeholder="password" inHeight={"43"} width={"100%"} setValue={setPassword} value={password} />
        
              <label
                htmlFor="remember-me"
                className="text-sm text-gray-900 cursor-pointer mt-2"
              >
                <input type="checkbox" id="remember-me" className="mr-2" />
                Remember me
              </label>
            {error&&<p>{error}</p>}
            <div className="flex items-center justify-between flex-wrap ">
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
            {loading && <Loader />}
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
