import './Quiz.css'
import { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import Result from '../Result/Result';

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
  const [showResults, setShowResults] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const letters = ["A","B","C","D"];

  const navigate = useNavigate();

  const { data, score, setScore, topicLogo } = useData(); // Acceder a los datos de las preguntas

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

  const getCheckedOption = () => document.querySelector("input[type='radio']:checked");

  const addStyles = (element: Element | null, parentClass: string, siblingClass: string) => {
    element?.parentElement?.parentElement?.classList.add(parentClass);
    element?.previousElementSibling?.classList.add(siblingClass);
  };
  
  const removeStyles = (elements: NodeListOf<Element>, className: string) => {
    elements.forEach((element) => element.classList.remove(className));
  };

  const addStylesToOptions = (parentClass: string, siblingClass: string) => {
    const checkedOption = getCheckedOption()
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
    styleOption('selected', 'selected', 'selected', 'selected');
  }

  const toggleDisplayForCorrectIncorrectIcon = (isCorrect: boolean) =>{
    const checkedOption = getCheckedOption()
    const iconElement = checkedOption?.parentElement?.parentElement?.querySelector('.icon-result') as HTMLImageElement;
    if(!checkedOption){
      document.querySelectorAll('.icon-result').forEach((el : Element)=>{
        const iconElement = el as HTMLImageElement; 
        iconElement.src = '/';
      })
      return;
    }

    if(isCorrect){
      iconElement.src = '/assets/images/icon-correct.svg';
    } else {
      const correctElement = document.querySelector(`.answers[data-answer="${correctAnswer}"]`)
      const correctElementIcon = correctElement?.querySelector('.icon-result') as HTMLImageElement;
      iconElement.src = '/assets/images/icon-incorrect.svg';
      correctElementIcon.src = '/assets/images/icon-correct.svg';
    }
  }

  const stopSelectingOptions = ()=>{
    document.querySelectorAll('.radios').forEach((el : Element)=>{
      const inputElement = el as HTMLInputElement; 
      inputElement.disabled= true;
    })
  }

  const resumeSelectingOptions = ()=>{
    document.querySelectorAll('.radios').forEach((el: Element)=>{
      const inputElement = el as HTMLInputElement; 
      inputElement.disabled= false;
    })
}

  const checkSubmittedResponse = () =>{
    if(answer?.trim() === correctAnswer?.trim()){
        return true
    }

    return false
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value)
    if(event.target.checked){
      handleStyleOnCheck()
    }
  }

  const handleSubmitQuestion = () => {
    if (!answer) {
      setError(true);
      return;
    }

    const checkedOption = getCheckedOption()
    if(checkedOption){
      stopSelectingOptions()
      const isCorrect = checkSubmittedResponse()
      if(isCorrect){
          setScore((prevScore) => prevScore + 1);
          addStylesToOptions('correct', 'correct');
          toggleDisplayForCorrectIncorrectIcon(isCorrect)
        } else{
          addStylesToOptions('incorrect', 'incorrect');
          toggleDisplayForCorrectIncorrectIcon(isCorrect)
      }
    }
    const submitButton = document.querySelector(".submit_answer") as HTMLButtonElement;
    if (submitButton) {
      submitButton.style.display = 'none';
    }

    const nextButton = document.querySelector(".next_question") as HTMLButtonElement;
    if (nextButton) {
      nextButton.style.display = 'block';
    }
  };

  const handleNextQuestion = () =>{
    document.querySelectorAll(".radios").forEach((element : Element)=>{
      const inputElement = element as HTMLInputElement; 
      inputElement.checked = false;
    })
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    setAnswer(undefined)
    removeStyleFromOptions('correct', 'correct');
    removeStyleFromOptions('incorrect', 'incorrect');
    removeStyleFromOptions('selected', 'selected');
    toggleDisplayForCorrectIncorrectIcon(false)
    resumeSelectingOptions()

    const submitButton = document.querySelector(".submit_answer") as HTMLButtonElement;
    if (submitButton) {
      submitButton.style.display = 'block';
    }

    const nextButton = document.querySelector(".next_question") as HTMLButtonElement;
    if (nextButton) {
      nextButton.style.display = 'none';
    } 
  }

  const handlePlayAgain = () =>{
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setError(false);
    setAnswer(undefined);
    removeStyleFromOptions('correct', 'correct');
    removeStyleFromOptions('incorrect', 'incorrect');
    removeStyleFromOptions('selected', 'selected');
    toggleDisplayForCorrectIncorrectIcon(false)
    resumeSelectingOptions()
    navigate('/'); 
  }

  return (
    <div className='quizz-container'>
      {!showResults && (
        <>
          <p className='question-number'>Question {currentQuestionIndex + 1}  of {questions.length}</p>

          {question && <p className='question'>{question}</p>}
          {options && (
            <ul className='options'>
              {options.map((option, index) => (
                <li key={index} className='option'>
                  <label tabIndex={0} htmlFor={`answer_${letters[index]}`} className="answers" data-answer={option}>
                    <div className="choice">
                      <span className="option_letter">{letters[index]}</span>
                      <input type="radio" className="radios" id={`answer_${letters[index]}`} name="answer" value={option} onChange={handleInputChange}/>
                      {option}  
                    </div>

                    <img src="" alt="" className='icon-result'/>
                  </label>
                </li>
              ))}
            </ul>
          )}

          {currentQuestionIndex <= questions.length - 1 && (
            <>
              <button onClick={handleSubmitQuestion} className='quizz-btn submit_answer'>{ answer ? 'Check Answer' : 'Select an answer' }</button>
              <button onClick={handleNextQuestion} className='quizz-btn next_question'>Next Question</button> 
            </>
          )}

          {currentQuestionIndex > questions.length - 1 && (
            <button onClick={() => setShowResults(true)} className='quizz-btn show-results'>Show results</button>
          )}

          {!answer && error && (
            <div className="unselected-error">
              <img src="/assets/images/icon-error.svg" alt="error-icon" />
              Please select an answer
            </div>
          )}
          </>
      )}

      {showResults && (
        <Result score={score} questionsLength={questions.length} subject={subject} topicLogo={topicLogo} handlePlayAgain={handlePlayAgain}/>
      )}
    </div>
  );
};

export default Quizz;


