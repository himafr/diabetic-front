import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import MedicinePage from "./pages/MedicinePage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WelcomePage from "./pages/WelcomePage";
import AppLayout from "./pages/AppLayout";
import { AuthProvider } from "./context/AuthContext";
import ProtectRoute from "./pages/ProtectRoute";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/app" element={
          <ProtectRoute>
          <AppLayout />
          </ProtectRoute>}>
          <Route index path="home" element={<HomePage />} />
          <Route path="medicine" element={<MedicinePage />} />

        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
