import "./Home.css";
import Subjects from "../Subject/Subjects";
import { useData } from "../../context/DataContext";
import { useEffect } from "react";

const Home = () => {
    const { setShowTopic } = useData();

    useEffect(() => {
        setShowTopic(false); // Ocultar logo y título en el home
      }, []);

    return (
        <div className="home">
            <h1 className="title">Welcome to the <strong>Frontend quiz!</strong></h1>
            <p className="subtitle">Pick a subject to get started!</p>
            <Subjects/>
        </div>
    )
}

export default Home