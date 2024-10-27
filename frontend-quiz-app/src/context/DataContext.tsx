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
    topicBgClass: string; 
    setTopicBgClass: React.Dispatch<React.SetStateAction<string>>;
}

export const DataContext = createContext<DataContextProps>({
    data: '',
    counter: 0,
    setCounter: () => {} ,
    score: 0,
    setScore: () => {},
    topicLogo: '',
    setTopicLogo: () => {},
    topicTitle: '',
    setTopicTitle: () => {},
    topicBgClass: '', 
    setTopicBgClass: () => {}
});


export const DataProvider = ({children} : {children: React.ReactNode}) => {
    const [data, setData] = useState(null);
    const [counter, setCounter] = useState(1);
    const [score, setScore] = useState(0);
    const [topicLogo, setTopicLogo] = useState('');
    const [topicTitle, setTopicTitle] = useState('');
    const [topicBgClass, setTopicBgClass] = useState('');


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
            topicBgClass, setTopicBgClass
        }}>
            {children}
        </DataContext.Provider>
    )
}

export function useData(){
    return useContext(DataContext)
}