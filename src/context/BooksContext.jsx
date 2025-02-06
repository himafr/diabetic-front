// import { createContext, useContext, useReducer } from "react";
// import baseUrl from "../const/const";

// const initialState={
//     books:null,
//     isLoading:false
// }
// function reducer(state,action){
//     switch(action.type){
//         case "books/loaded": return {
//             ...state,
//             books: action.books,
//             isLoading:false
//         }
//         // case "book/loaded":return {
//         //     ...state,
//         //     jwt_token:action.payload.jwt_token,
//         //     user:action.payload.user,
//         //     isAuthenticated:true,
//         //     isLoading:false
//         // };
//         case "add/book":return{
//           ...state,
//           user:action.payload.user,
//           isAuthenticated:true,
//           isLoading:false
//         }
//         case "update/book":return {
//             ...state,
//             jwt_token:null,
//             user:null,
//             // isAuthenticated:false,
//             isLoading:false
//         }
//         case "loading" :return{
//           ...state,
//           isLoading:true,
//         }
//         case "loaded":return {
//           ...state,
//           isLoading:false,
//         }
//         default:throw new Error("action not found ");
//     }
// }
// const AuthContext =createContext();
// function AuthProvider({children}){
//     const [{username,isAuthenticated,jwt_token,user},dispatch]=useReducer(reducer,initialState)

//     function login(username,password){ 
//       dispatch({type:"loading"})
//       async function fetchLogin() {
//         try {
//           const res = await fetch(baseUrl+"api/v1/users/login",{ 
//             method: 'POST',
//             body:JSON.stringify({username,password}),
//             headers: {'Content-Type': 'application/json'}});
//           const data = await res.json();
//           console.log(data)
//           if(data.status=="success"){
//             dispatch({type:'login', payload:{jwt_token:data.token,user:data.data.userData}});
//             localStorage.jwt_token = data.token;
//           }else{
//             dispatch({type:"loaded"})
//             alert("invalid credentials")
//           }
//         } catch {
//           dispatch({type:"loaded"})
//           alert("something went wrong while loading data");
//         }
//       }
//       fetchLogin();
//     }
//     function logged(user){
//       dispatch({type:'logged', payload:{user}})
//     }
//     function logout() {
//         dispatch({type:'logout'})
//     }

//     return <AuthContext.Provider value={{
//         username,
//         isAuthenticated,
//         jwt_token,
//         login,
//         logout,
//         dispatch,
//         logged,
//         user
//     }}>
//         {/* auth state */}
//         {children}
//     </AuthContext.Provider>
// }

// function useAuth(){
//     const context =useContext(AuthContext);
//     if(context ===undefined)
//         throw new Error('useAuth must be used within an AuthProvider')
//     return context;
// }
// export { AuthProvider , useAuth }