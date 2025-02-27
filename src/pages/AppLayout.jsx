import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";

function AppLayout() {
  const { socket, isConnected } = useSocket();
  const {user}=useAuth()

  if (socket) {
    console.log("user");
    socket.emit('user active', user);
  }
  return (
    <div>
      <NavBar />
      <Outlet />
      <footer style={{position:"fixed",bottom:"0"}}>footer</footer>
    </div>
  );
}

export default AppLayout;
