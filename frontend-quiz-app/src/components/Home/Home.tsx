import "./Home.css";
import Subjects from "../Subject/Subjects";

const Home = () => {

    return (
        <div className="home">
            <h1 className="title">Welcome to the <strong>Frontend quiz!</strong></h1>
            <p className="subtitle">Pick a subject to get started!</p>
            <Subjects/>
        </div>
    )
}

export default Home