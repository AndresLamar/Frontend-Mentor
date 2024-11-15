import { IconAge, IconGender, IconMuscle, IconPregnancy, IconRace } from "../Icons/Icons";
import "./Limitations.css";

export const Limitations = () => {
  return (
    <section className="limitations">
        <div className="limitations__content">
        <h2 className="limitations__title">Limitations of BMI</h2>
        <p className="limitations__text">
            Although BMI is often a practical indicator of healthy weight, it is
            not suited for every person. Specific groups should carefully consider
            their BMI outcomes, and in certain cases, the measurement may not be
            beneficial to use.
        </p>
        </div>
        <div className="limitations__card gender">
            <div className="card__header">
                <div className="card__icon">
                    <IconGender />
                </div>
                <h3 className="limitations__subtitle">Gender</h3>
            </div>
            <p className="limitations__card__text">
            The development and body fat composition of girls and boys vary with
            age. Consequently, a child's age and gender are considered when
            evaluating their BMI.
            </p>
        </div>
        <div className="limitations__card age">
            <div className="card__header">
                <div className="card__icon">
                    <IconAge />
                </div>
            <h3 className="limitations__subtitle">Age</h3>
            </div>
            <p className="limitations__card__text">
            In aging individuals, increased body fat and muscle loss may cause BMI
            to underestimate body fat content.
            </p>
        </div>
        <div className="limitations__card muscle">
            <div className="card__header">
                <div className="card__icon">
                    <IconMuscle />
                </div>
            <h3 className="limitations__subtitle">Muscle</h3>
            </div>
            <p className="limitations__card__text">
            BMI may misclassify muscular individuals as overweight or obese,
            as it doesn't differentiate muscle from fat.
            </p>
        </div>
        <div className="limitations__card pregnancy">
            <div className="card__header">
                <div className="card__icon">
                    <IconPregnancy />
                </div>
            <h3 className="limitations__subtitle">Pregnancy</h3>
            </div>
            <p className="limitations__card__text">
            Expectant mothers experience weight gain due to their growing baby.
            Maintaining a healthy pre-pregnancy BMI is advisable to minimise
            health risks for both mother and child.
            </p>
        </div>
        <div className="limitations__card race">
            <div className="card__header">
                <div className="card__icon">
                    <IconRace />
                </div>
            <h3 className="limitations__subtitle">Race</h3>
            </div>
            <p className="limitations__card__text">
            Certain health concerns may affect individuals of some Black and Asian
            origins at lower BMIs than others. To learn more, it is advised to
            discuss this with your GP or practice nurse.
            </p>
        </div>
    </section>
  );
};
