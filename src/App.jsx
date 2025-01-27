import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage' ;
import MedicinePage from './pages/MedicinePage';
import NotFound from './pages/NotFound';

function App() {

  return <BrowserRouter>
    <Routes>
      <Route  path="/" element={<HomePage />} />
      <Route  path="/about" element={<AboutPage />} />
      <Route  path="/medicine" element={<MedicinePage />} />
      <Route  path='*' element={<NotFound />} /> 
    </Routes>
  </BrowserRouter>
}

export default App
