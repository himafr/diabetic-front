import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import MedicinePage from "./pages/MedicinePage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WelcomePage from "./pages/welcomePage/WelcomePage";
import AppLayout from "./pages/AppLayout";
import { AuthProvider } from "./context/AuthContext";
import ProtectRoute from "./pages/ProtectRoute";
import MedAdd from "./pages/MedAdd";
import MedPage from "./pages/MedPage";
import MedEdit from "./pages/MedEdit";
import ProfilePage from "./pages/ProfilePage";
import RecipesPage from "./pages/RecipesPage";
import RecipePage from "./pages/RecipePage";
import BooksPage from "./pages/BooksPage";
import BookPage from "./pages/BookPage";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/app"
            element={
              <ProtectRoute>
                <AppLayout />
              </ProtectRoute>
            }
          >
            <Route index element={<Navigate to="home" replace />} />
            <Route index path="home" element={<HomePage />} />
            <Route path="medicine" element={<MedicinePage />} />
            <Route path="medicine/add" element={<MedAdd />} />
            <Route path="medicine/edit/:id" element={<MedEdit />} />
            <Route path="medicine/:id" element={<MedPage />} />
            <Route path="recipes" element={<RecipesPage />} />
            <Route path="recipes/:id" element={<RecipePage />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="books/:id" element={<BookPage />} />
            <Route path="medicine/:id" element={<MedicinePage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
