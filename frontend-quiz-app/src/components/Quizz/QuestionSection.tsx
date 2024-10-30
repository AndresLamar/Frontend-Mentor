import { useEffect} from 'react';

export default function QuestionSection({counter, currentQuestion, questionsLength, question} : {counter: number, currentQuestion: number, questionsLength: number, question: string | undefined}){
    useEffect(()=>{
        if(counter){
            const input = document.querySelector('#progress') as HTMLInputElement;
            input.style.setProperty('--range_status', `${counter ? counter*10 : 0}%`);
        }
    },[counter])

    if(counter){
        return(
            <>
                <p className='question-number'>Question {currentQuestion + 1}  of {questionsLength}</p>
                {question && <p className='question'>{question}</p>}
                <input id='progress'type="range" className='range_status' min={1} max={10} value={counter} readOnly/>
            </>
        )
    }else{  
        return(
            <h3>Loading question ...</h3>
        )
    }
}