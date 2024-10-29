import './Quiz.css'
import { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';

interface Quiz {
  title: string;
  icon: string;
  questions: Question[];
}

interface Question {
  question: string;
  options: string[];
  answer: string; 
}

const Quizz = ({ subject }: { subject: string }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState<string | undefined>(undefined);
  const [options, setOptions] = useState<string[] | undefined>(undefined);
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const [correctAnswer, setCorrectAnswer] = useState<string | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const letters = ["A","B","C","D"];
  
  const { data } = useData(); // Acceder a los datos de las preguntas

  // Filtrar preguntas del tema actual
  const questions = data?.find((quiz : Quiz)  => quiz.title.toLowerCase() === subject.toLocaleLowerCase())?.questions || [];

  useEffect(() => {
    // Update question, options, and answer whenever the currentQuestionIndex changes
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        setQuestion(currentQuestion.question);
        setOptions(currentQuestion.options);
        setCorrectAnswer(currentQuestion.answer);
    }
  }, [currentQuestionIndex, questions]);

  

  const addStyles = (element: Element | null, parentClass: string, siblingClass: string) => {
    element?.parentElement?.classList.add(parentClass);
    element?.previousElementSibling?.classList.add(siblingClass);
  };
  
  const removeStyles = (elements: NodeListOf<Element>, className: string) => {
    elements.forEach((element) => element.classList.remove(className));
  };

  const addStylesToOptions = (parentClass: string, siblingClass: string) => {
    const checkedOption = document.querySelector("input[type='radio']:checked");
    addStyles(checkedOption, parentClass, siblingClass);
  };
  
  const removeStyleFromOptions = (answerClass: string, letterClass: string) => {
    removeStyles(document.querySelectorAll(".answers"), answerClass);
    removeStyles(document.querySelectorAll(".option_letter"), letterClass);
  };

  const styleOption = (answerClass: string, letterClass: string, parentClass: string, siblingClass: string) => {
    removeStyleFromOptions(answerClass, letterClass);
    addStylesToOptions(parentClass, siblingClass);
  };

  const handleStyleOnCheck = ()=>{
    // document.querySelector(".error_message").style.display = 'none';
    styleOption('selected', 'selected', 'selected', 'selected');
  }

  const handleNextQuestion = () => {
    // Check if the selected answer is correct
    if (!answer) {
      setError(true);
      return;
    }

    if (answer === correctAnswer) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    }else{
      console.log('Incorrect answer')
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value)
    if(event.target.checked){
      handleStyleOnCheck()
    }
  }


  return (
    <div className='quizz-container'>
          <p className='question-number'>Question {currentQuestionIndex + 1}  of {questions.length}</p>

          {question && <p className='question'>{question}</p>}
          {options && (
            <ul className='options'>
              {options.map((option, index) => (
                <li key={index} className='option'>
                  <label tabIndex={0} htmlFor={`answer_${letters[index]}`} className="answers">
                    <span className="option_letter">{letters[index]}</span>
                    <input type="radio" className="radios" id={`answer_${letters[index]}`} name="answer" value={option} onChange={handleInputChange}/>
                    {option}  

                  </label>
                </li>
              ))}
            </ul>
          )}

          {currentQuestionIndex < questions.length - 1 && (
            <button onClick={handleNextQuestion} className='quizz-btn'>{ answer ? 'Submit Answer' : 'Select an answer' }</button>
          )}

          {!answer && error && (
            <div className="unselected-error">
              <img src="/assets/images/icon-error.svg" alt="error-icon" />
              Please select an answer
            </div>
          )}
    </div>
  );
};

export default Quizz;


