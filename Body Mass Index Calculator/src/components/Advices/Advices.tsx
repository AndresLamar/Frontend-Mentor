import "./Advices.css";
import { IconEating, IconExercise, IconSleep } from '../Icons/Icons'

export const Advices = () => {
  return (
    <section className="advices">
      <div className="advices__container">
        <div className="advices__icon">
            <IconEating/>
        </div>
        <div className="advices__content">
          <h3 className="advices__title">Healthy eating</h3>
          <p className="advices__text">
            Healthy eating promotes weight control, disease prevention, better
            digestion, immunity, mental clarity, and mood.
          </p>
        </div>
      </div>

      <div className="advices__container">
        <div className="advices__icon">
            <IconExercise />
        </div>
        <div className="advices__content ">
          <h3 className="advices__title">Regular exercise</h3>
          <p className="advices__text">
            Exercise improves fitness, aids weight control, elevates mood, and
            reduces disease risk, fostering wellness and longevity.
          </p>
        </div>
      </div>
      <div className="advices__container">
        <div className="advices__icon">
            <IconSleep />
        </div>
        <div className="advices__content">
          <h3 className="advices__title">Adequate sleep</h3>
          <p className="advices__text">
            Sleep enhances mental clarity, emotional stability, and physical
            wellness, promoting overall restoration and rejuvenation.
          </p>
        </div>
      </div>
    </section>
  );
};
