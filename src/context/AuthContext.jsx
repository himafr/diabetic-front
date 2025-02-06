import { createContext, useContext, useReducer } from "react";
import baseUrl from "../const/const";
import axios from "axios";

const initialState = {
  jwt_token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "register":
      return {
        ...state,
        jwt_token: action.payload.jwt_token,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case "login":
      return {
        ...state,
        jwt_token: action.payload.jwt_token,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case "logged":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case "logout":
      return {
        ...state,
        jwt_token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "loaded":
      return {
        ...state,
        isLoading: false,
      };
    default:
      throw new Error("action not found ");
  }
}
const AuthContext = createContext();
function AuthProvider({ children }) {
  const [{ username, isAuthenticated, jwt_token, user }, dispatch] = useReducer(
    reducer,
    initialState
  );

async function login(username, password) {
    dispatch({ type: "loading" });
      try {
        const res = await axios.post(baseUrl + "api/v1/users/login",{ username, password } ,{
          headers: { "Content-Type": "application/json" },
        });
        const data=res.data
        console.log(data)

        if (data.status == "success") {
          if (data.data.userData.role == "admin")throw new Error("Admin role is not allowed") 
          localStorage.jwt_token = data.token;
          dispatch({
            type: "login",
            payload: { jwt_token: data.token, user: data.data.userData },
          });
        } else {
          dispatch({ type: "loaded" });
          alert(data.message);
        }
      } catch (e) {
        dispatch({ type: "loaded" });
        if (e.response?.data?.message) {
          e.message=e.response.data.message;
        }
        // const err =new Error
        // err.message="Admin role is not allowed"
        throw e;
      }
  }
  function register(userData) {
    dispatch({ type: "loading" });
    async function fetchRegister() {
      try {
        const res = await fetch(baseUrl + "api/v1/users/signup", {
          method: "POST",
          body: JSON.stringify(userData),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.status == "success") {
          dispatch({
            type: "login",
            payload: { jwt_token: data.token, user: data.data.userData },
          });
          localStorage.jwt_token = data.token;
        } else {
          dispatch({ type: "loaded" });
          alert("invalid credentials");
        }
      } catch {
        dispatch({ type: "loaded" });
        alert("something went wrong while loading data");
      }
    }
    fetchRegister();
  }
  function logged(user) {
    dispatch({ type: "logged", payload: { user } });
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        username,
        isAuthenticated,
        jwt_token,
        login,
        logout,
        dispatch,
        logged,
        user,
        register,
      }}
    >
      {/* auth state */}
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
export { AuthProvider, useAuth };
