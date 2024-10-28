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

//   </head>
//   <body>
//     <main>
//       <div class="wrapper">
//         <div class="question_box">
//           <p class="hidden curr_question_number">
//             Question <span class="current_number"></span> of 10
//           </p>
//           <div class="question">
//             <h1>
//               <span>Welcome to the</span> <br />
//               Frontend quiz!
//             </h1>
//             <p></p>
//           </div>
//           <div class="progress_bar" data-initial="true">
//             <p>Pick a subject to get started!</p>
//             <div class="bar hidden" data-value="1">
//               <div class="current_bar"></div>
//             </div>
//           </div>
//         </div>
//         <div class="topics">
//           <div class="topic">
//             <div class="html_icon">
//               <img src="assets/images/icon-html.svg" alt="" />
//             </div>
//             <p>HTML</p>
//           </div>
//           <div class="topic">
//             <div class="css_icon">
//               <img src="assets/images/icon-css.svg" alt="" />
//             </div>
//             <p>CSS</p>
//           </div>
//           <div class="topic">
//             <div class="js_icon">
//               <img src="assets/images/icon-js.svg" alt="" />
//             </div>
//             <p>JavaScript</p>
//           </div>
//           <div class="topic">
//             <div class="accessibility_icon">
//               <img src="assets/images/icon-accessibility.svg" alt="" />
//             </div>
//             <p>Accessibility</p>
//           </div>
//         </div>
//         <div class="answers hidden">
//           <div class="answer first">
//             <div class="choice">
//               <p>A</p>
//               <p></p>
//             </div>
//             <div class="result"></div>
//           </div>
//           <div class="answer second">
//             <div class="choice">
//               <p>B</p>
//               <p></p>
//             </div>
//             <div class="result"></div>
//           </div>
//           <div class="answer third">
//             <div class="choice">
//               <p>C</p>
//               <p></p>
//             </div>
//             <div class="result"></div>
//           </div>
//           <div class="answer fourth">
//             <div class="choice">
//               <p>D</p>
//               <p></p>
//             </div>
//             <div class="result"></div>
//           </div>
//           <button class="submit">Submit answer</button>
//           <div class="error hidden">
//             <img src="assets/images/icon-error.svg" alt="" />
//             <p>Please select an answer</p>
//           </div>
//         </div>
//         <div class="result_container hidden">
//           <h2>
//             Quiz completed <br />
//             <span class="bold">You scored...</span>
//           </h2>
//           <div class="score_container">
//             <div class="result_score">
//               <p class="score"></p>
//               <p>Out of 10</p>
//             </div>
//             <button class="reset">
//               <a href="../frontend-quiz">Play again</a>
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   </body>
// </html>
