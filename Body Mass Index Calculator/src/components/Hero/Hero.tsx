import "./Hero.css";

export const Hero = () => {
  return (
    <div className="hero__container">
      <section className="hero__intro">
        <h1 className="intro__title">Body Mass Index Calculator</h1>
        <p className="intro__text">
          Better understand your weight in relation to your height using our
          body mass index (BM) calculator. While BMI is not the sole determinant
          of a healthy weight, it offers a valuable starting point to evaluate
          your overall health and well-being.
        </p>
      </section>
      <section className="hero__form-wrapper">
        <form className="hero__form">
          <fieldset
            // role="radiogroup"
            // aria-invalid="false"
            // aria-describedby="query-type-error"
            // aria-required="true"
          >
            <h2 className="form__title">Enter your details below</h2>
            <div className="form__radios">
              <label className="radio__label" htmlFor="metric">
                <input
                  name="measurement"
                  value="metric"
                  id="metric"
                  type="radio"
                  checked
                />
                Metric
              </label>
              <label className="radio__label" htmlFor="imperial">
                <input
                  name="measurement"
                  value="imperial"
                  id="imperial"
                  type="radio"
                />
                Imperial
              </label>
            </div>

            <div className="form__text-inputs metric active">
              <div className="text-inputs__height text-input">
                <label className="measurement__label label" htmlFor="height-cm">
                  Height
                </label>
                <input
                  id="height-cm"
                  type="text"
                  placeholder="0"
                  maxLength={3}
                  required
                />
                <span className="placeholder-text cm">cm</span>
              </div>
              <div className="text-inputs__weight text-input">
                <label className="measurement__label label" htmlFor="weight-kg">
                  Weight
                </label>
                <input
                  id="weight-kg"
                  type="text"
                  placeholder="0"
                  maxLength={3}
                  required
                />
                <span className="placeholder-text kg">kg</span>
              </div>
            </div>
          </fieldset>
        </form>

        <div className="form__result">
          <div className="result__title-wrapper">
            <h3 className="result__title">Your BMI is...</h3>
            <span className="result__number">23.4</span>
          </div>
          
            <p className="result__text">   
            Your BMI suggest you´re a healthy weight. Your ideal weight is between <span>63.3kgs - 85.2kgs.</span>
            </p>
        </div>
      </section>
    </div>
  );
};
