import './Subjects.css'
import { useData } from "../../context/DataContext"

interface SubjectProps {
    title: string;
    icon: string;
}

const Subject = ({title, icon} : SubjectProps) =>{
    return(
        <div className="subject-card">
            <div className="icon">
                <img src={icon} alt={`${title} icon`} className={`subject-${title}`}/>
            </div>
            <p className="title">{title}</p>
        </div>
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