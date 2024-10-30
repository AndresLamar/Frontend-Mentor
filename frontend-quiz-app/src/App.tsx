import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from "./context/ThemeContext";
import Quizz from './components/Quizz/Quizz';

function App() {

  return (
    <DataProvider>
      <ThemeProvider>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Ruta para la página principal */}
            <Route path="/html" element={<Quizz subject="HTML" />} /> {/* Ruta para preguntas de HTML */}
            <Route path="/css" element={<Quizz subject="CSS" />} />  {/* Ruta para preguntas de CSS */}
            <Route path="/javascript" element={<Quizz subject="JavaScript" />} /> {/* Ruta para preguntas de JS */}
            <Route path="/accessibility" element={<Quizz subject="Accessibility" />} /> {/* Ruta para preguntas de accesibilidad */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </DataProvider>
  )
}

export default App