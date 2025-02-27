import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";

function AppLayout() {
  const {user}=useAuth()

  
  return (
    <div>
      <NavBar />
      <Outlet />
      <footer style={{position:"fixed",bottom:"0"}}>footer</footer>
    </div>
  );
}

export default AppLayout;
