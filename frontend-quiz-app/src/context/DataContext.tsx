import { createContext, useContext, useState, useEffect} from "react";

interface DataContextProps {
    data: any;
    counter: number;
    setCounter: React.Dispatch<React.SetStateAction<number>>;
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    topicLogo: string;
    setTopicLogo: React.Dispatch<React.SetStateAction<string>>;
    topicTitle: string;
    setTopicTitle: React.Dispatch<React.SetStateAction<string>>;
    showTopic: boolean; 
    setShowTopic: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DataContext = createContext<DataContextProps>({
    data: '',
    counter: 1,
    setCounter: () => {} ,
    score: 0,
    setScore: () => {},
    topicLogo: '',
    setTopicLogo: () => {},
    topicTitle: '',
    setTopicTitle: () => {},
    showTopic: false, 
    setShowTopic: () => {}
});


export const DataProvider = ({children} : {children: React.ReactNode}) => {
    const [data, setData] = useState(null);
    const [counter, setCounter] = useState(1);
    const [score, setScore] = useState(0);
    const [topicLogo, setTopicLogo] = useState('');
    const [topicTitle, setTopicTitle] = useState('');
    const [showTopic, setShowTopic] = useState(false);


    useEffect(()=>{
        fetch('/data.json')
        .then((response) => response.json())
        .then((jsonData) =>{
            setData(jsonData.quizzes);
        })
        .catch((error) => console.error('Error fetching the data: ', error));
    },[]);

    return (
        <DataContext.Provider value={{
            data, 
            counter, setCounter, 
            score, setScore, 
            topicLogo, setTopicLogo, 
            topicTitle, setTopicTitle, 
            showTopic, setShowTopic
        }}>
            {children}
        </DataContext.Provider>
    )
}

export function useData(){
    return useContext(DataContext)
}