// import { useParams } from 'react-router-dom';
// import { useData } from '../../context/DataContext';

const Quizz = ({ subject }: { subject: string }) => {
//   const { subject } = useParams(); // Obtener el tema de la URL
//   console.log(subject)

//   const { data } = useData(); // Acceder a los datos de las preguntas

  // Filtrar preguntas del tema actual
//   const questions = data?.find(quiz => quiz.title.toLowerCase() === subject)?.questions || [];

  return (
    <div>
      <h1>{subject} Quiz</h1>
      {/* ... (código para mostrar las preguntas de 'questions') */}
    </div>
  );
};

export default Quizz;


