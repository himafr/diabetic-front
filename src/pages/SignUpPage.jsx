import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/inputField/InputField.handle";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { EyeIcon } from "@heroicons/react/16/solid";

function SignUpPage() {
  const navigate = useNavigate();
const [showPassword,setShowPassword] = useState(false)
  const { register, logged, isAuthenticated, isLoading } = useAuth();
  const [loading, setLoading] = useState(isLoading);

  const [isValid,setIsValid] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    number: "",
    email: "",
  });
  const handleChange = (e) => {
    if(e.target.name==="password")setIsValid( validate.password(e.target.value));
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  useEffect(
    function () {
      if (!isAuthenticated) {
        if (localStorage.jwt_token) {
          console.log("start");
          try {
            const user = jwtDecode(localStorage.jwt_token);
            console.log(user);
            if (user) {
              logged(user);
              navigate("/app", { replace: true });
            }
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        navigate("/app", { replace: true });
      }
    },
    [isAuthenticated, logged, navigate]
  );
  const validate = {
    /**
     * @description
     * takes the user's plaintext password
     * and checks whether the password contains:
     * 1. at least 5 characters
     * 2. at least 1 upper case letter
     * 3. at least 1 lower case letter
     * 4. at least 1 number or special character
     * @param {string} str the plaintext password of the user
     * @returns {boolean} either true or false based on the check
     */
    password: (str) => {
      const regex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  
      return str.length >= 5 && regex.test(str);
    },
  };
  function handleSignup(e) {
    e.preventDefault();
    if(!isValid)return;
    setLoading(true);
    const {
      username,
      password,
      first_name,
      last_name,
      date_of_birth,
      number,
      email,
    } = userData;
    if (username && password && first_name && date_of_birth) {
      let dataToBeSent = {
        ...(username != "" && { username: username }),
        ...(password != "" && { password: password }),
        ...(first_name != "" && { first_name: first_name }),
        ...(date_of_birth != "" && { date_of_birth: date_of_birth }),
        ...(last_name != "" && { last_name: last_name }),
        ...(email != "" && { email: email }),
        ...(number != "" && { number: number }),
      };
      register(dataToBeSent);
    }
  }
  return (
    <div style={{ backgroundColor: "#e2ddd9", height: "100dvh" ,direction:"ltr"}}>
      <form onSubmit={handleSignup}>
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <h1 style={{ marginTop: "0px" }}>Sign up</h1>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-1 gap-5">
                <InputField
                  type={"text"}
                  placeholder="username"
                  width={"100%"}
                  name="username"
                  required={true}
                  handleValue={handleChange}
                />
                  <div className="flex relative">
                <InputField
                 type={showPassword?"text":"password"} 
                  placeholder="password"
                  width={"100%"}
                  name="password"
                  outColor={!isValid?"red":"#6b9997"}
                  required={true}
                  handleValue={handleChange}
                />
                      <EyeIcon onClick={()=>setShowPassword(val=>!val)} width={24} className="absolute right-4 top-2"/>
                      </div>
              </div>
              {!isValid&&
                <p style={{color:"red",paddingTop:"8px",fontSize:"11px"}}>Password should be at least 5 characters long and contain at least one uppercase letter, one lowercase letter, and one number or special character.</p>
                }
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <br />
                  <InputField
                    type={"text"}
                    placeholder="first name"
                    width={"100%"}
                    name="first_name"
                    required={true}
                    handleValue={handleChange}
                  />
                </div>
                <div>
                  <label className="relative bottom-2">Date Of Birth</label>
                  <InputField
                    type={"date"}
                    placeholder="
                    "
                    width={"100%"}
                    name="date_of_birth"
                    required={true}
                    handleValue={handleChange}
                  />
                </div>
              </div>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-1 gap-5">
                <InputField
                  type={"text"}
                  placeholder="last name optional"
                  width={"100%"}
                  name="last_name"
                  handleValue={handleChange}
                />
                <InputField
                  type={"text"}
                  placeholder="phone number optional"
                  width={"100%"}
                  name="number"
                  handleValue={handleChange}
                />
                <InputField
                  type={"email"}
                  placeholder="email optional"
                  width={"100%"}
                  name="email"
                  handleValue={handleChange}
                />
              </div>

              <div className="mt-5">
                <button
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                <Link
                  className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                  to={"/login"}
                >
                  have an account? Log in
                </Link>
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
