import './Subjects.css'
import { useData } from "../../context/DataContext"
import { Link } from 'react-router-dom';

interface SubjectProps {
    title: string;
    icon: string;
}

const Subject = ({title, icon} : SubjectProps) =>{
    const { setTopicLogo, setTopicTitle, setShowTopic } = useData();

    const handleSubjectClick = () => {
        setTopicLogo(icon);
        setTopicTitle(title);
        setShowTopic(true)
    }

    return(
        <Link to={`/${title.toLowerCase()}`}>
            <div className="subject-card" onClick={handleSubjectClick}>
                <div className="icon">
                    <img src={icon} alt={`${title} icon`} className={`subject-${title}`} width="40" height="40"/>
                </div>
                <p className="title">{title}</p>
            </div>
        </Link>
    )
}

const Subjects = () => {
    const { data } = useData()

    return(
        <ul className="subjects-container">
            {
                data && data.map((quiz : {title: string, icon: string}) => (
                <Subject title={quiz.title} icon={quiz.icon} key={quiz.title}/>
                ))
            }
        </ul>
    )
}

export default Subjects