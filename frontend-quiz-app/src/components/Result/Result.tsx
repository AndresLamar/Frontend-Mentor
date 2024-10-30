import './Result.css'

interface ResultProps{
    score: number;
    questionsLength: number;
    subject: string;
    topicLogo: string;
    handlePlayAgain: () => void;
}

const Result = ({score, questionsLength, subject, topicLogo, handlePlayAgain} : ResultProps) => {
    return (
        <div className="quizz-results">
          <p className='result-text'>Quiz completed <span>You scored...</span></p>

          <div className="score">
            <div className='selected-topic'> 
              <img src={topicLogo} alt={`${subject} icon`} className={`subject-${subject}`}/>
              <p>{subject}</p>
            </div>
            <p className='score-number'>{score}</p>
            <p className='score-questions'>Out of {questionsLength}</p>
          </div>

          <button onClick={handlePlayAgain} className='quizz-btn play-again'>Play again</button>
        </div>
    )
} 

export default Result