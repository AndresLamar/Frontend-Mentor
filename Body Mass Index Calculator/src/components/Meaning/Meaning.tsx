import './Meaning.css'
import image from '../../assets/images/image-man-eating.webp'

export const Meaning = () => {
    return (
        <section className="meaning">
            <img className="meaning__img" src={image} alt="Image of a man eating" width={736} height={695} />
            <div className="meaning__content">
                <h2 className="meaning__title">What your BMI result means</h2>
                <p className="meaning__text">
                A BMI range of 18.5 to 24.9 is considered a 'healthy weight' Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced
                fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week.
                </p>
            </div>
        </section>
    )
}