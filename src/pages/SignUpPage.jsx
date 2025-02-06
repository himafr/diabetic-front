import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/inputField/InputField.handle";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function SignUpPage() {
  const navigate = useNavigate();

  const { register, logged, isAuthenticated, isLoading } = useAuth();
  const [loading, setLoading] = useState(isLoading);
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
  function handleSignup(e) {
    e.preventDefault();
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

      console.log(dataToBeSent);
      register(dataToBeSent);
    }
  }
  return (
    <div style={{ backgroundColor: "#e2ddd9", height: "100dvh" }}>
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
                <InputField
                  type={"password"}
                  placeholder="password"
                  width={"100%"}
                  name="password"
                  required={true}
                  handleValue={handleChange}
                />
              </div>
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
