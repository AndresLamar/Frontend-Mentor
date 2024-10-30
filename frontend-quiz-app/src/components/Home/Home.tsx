import "./Home.css";
import Subjects from "../Subject/Subjects";
import { useData } from "../../context/DataContext";
import { useEffect } from "react";

const Home = () => {
    const { setShowTopic, setCounter } = useData();

    useEffect(() => {
        setShowTopic(false); // Ocultar logo y título en el home
        setCounter(1)
      }, []);

    return (
        <div className="home">
            <div className="title-container">
                <h1 className="title">Welcome to the <strong>Frontend quiz!</strong></h1>
                <p className="subtitle">Pick a subject to get started!</p>
            </div>
            <Subjects/>
        </div>
    )
}

export default Home