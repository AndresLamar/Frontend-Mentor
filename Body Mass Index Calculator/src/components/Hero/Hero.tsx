import { useState, useEffect, ChangeEvent } from "react";
import "./Hero.css";

enum MeasurementSystem {
  METRIC = "metric",
  IMPERIAL = "imperial",
}

enum Category {
  SEVERELY_UNDERWEIGHT = "severely underweight",
  UNDERWEIGHT = "underweight",
  NORMAL = "normal",
  OVERWEIGHT = "overweight",
  MODERATELY_OBESE = "moderately obese",
  SEVERELY_OBESE = "severely obese",
  MORBIDLY_OBESE = "morbidly obese"
}

export const Hero = () => {
  const [measurementSystem, setMeasurementSystem] = useState<
  MeasurementSystem
  >(MeasurementSystem.METRIC);
  const [heightCm, setHeightCm] = useState<number | null>(null);
  const [weightKg, setWeightKg] = useState<number | null>(null);
  const [heightFt, setHeightFt] = useState<number | null>(null);
  const [heightIn, setHeightIn] = useState<number | null>(null);
  const [weightSt, setWeightSt] = useState<number | null>(null);
  const [weightLb, setWeightLb] = useState<number | null>(null);
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [categoty, setCategory] = useState<Category | null>(null);

  // Manejo del cambio entre sistema métrico e imperial
  const handleSystemChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMeasurementSystem(e.target.value as MeasurementSystem);
    resetInputs(); // Resetea los inputs al cambiar el sistema de medición
  };

  // Resetea los valores de entrada cuando cambia el sistema de medición
  const resetInputs = () => {
    setHeightCm(null);
    setWeightKg(null);
    setHeightFt(null);
    setHeightIn(null);
    setWeightSt(null);
    setWeightLb(null);
    setBmiResult(null);
  };

   // Función para calcular el BMI en sistema métrico
  const calculateMetricBMI = () => {
    if (heightCm !== null && weightKg !== null) {
      const heightInMeters = Number((heightCm / 100).toFixed(2));
      const bmi = Number((weightKg / (heightInMeters * heightInMeters)));
      return Number(bmi.toFixed(1));
    }
    return null;
  };

  // Función para calcular el BMI en sistema imperial
  const calculateImperialBMI = () => {
    if (heightFt !== null && heightIn !== null && weightSt !== null && weightLb !== null) {
      const heightInMetric = (heightFt * 0.3048 + heightIn * 0.0254).toFixed(1);
      const weightInMetric = (weightSt * 6.35029 + weightLb * 0.453592).toFixed(1);
      const bmi = Number((Number(weightInMetric) / (Number(heightInMetric) * Number(heightInMetric))).toFixed(1));
      // const minWeight = Number((18.5 * (Number(heightInMetric) * Number(heightInMetric))).toFixed(1));
      // const maxWeight = Number((24.9 * (Number(heightInMetric) * Number(heightInMetric))).toFixed(2));

      // const totalInches = heightFt * 12 + heightIn;
      // const totalPounds = weightSt * 14 + weightLb;
      // const bmi = (totalPounds / (totalInches * totalInches)) * 703;
      return Number(bmi.toFixed(1));
    }
    return null;
  };

  // Función para calcular los pesos ideales en kg
  const calculateIdealWeightMetric = (heightCm: number) => {
    const heightInMeters = Number((heightCm / 100).toFixed(2));
    const minWeight = Number((18.5 * (heightInMeters * heightInMeters)));
    const maxWeight = Number((24.9 * (heightInMeters * heightInMeters)));
    return {
      minWeight: Number(minWeight.toFixed(1)),
      maxWeight: Number(maxWeight.toFixed(1)),
    };
  };

  // Función para calcular los pesos ideales en st y lb
  const calculateIdealWeightImperial = (heightFt: number, heightIn: number) => {
    const totalInches = heightFt * 12 + heightIn;
    const minWeightInPounds = 18.5 * (totalInches * totalInches) / 703;
    const maxWeightInPounds = 24.9 * (totalInches * totalInches) / 703;
    
    const minWeightSt = Math.floor(minWeightInPounds / 14); // Stones
    const minWeightLb = Number((minWeightInPounds % 14).toFixed(1)); // Remaining lbs
    const maxWeightSt = Math.floor(maxWeightInPounds / 14);
    const maxWeightLb = Number((maxWeightInPounds % 14).toFixed(1));
    
    return {
      minWeightSt,
      minWeightLb,
      maxWeightSt,
      maxWeightLb,
    };
  };

  const checkBMI = (bmi: number) => {
    if(Number(bmi) < 16.0){
      setCategory(Category.SEVERELY_UNDERWEIGHT)
    } else if (Number(bmi) >= 16.0 && Number(bmi) <= 18.4) {
      setCategory(Category.UNDERWEIGHT)
    } else if (Number(bmi) >= 18.5 && Number(bmi) <= 24.9) {
      setCategory(Category.NORMAL)
    } else if (Number(bmi) >= 25 && Number(bmi) <= 29.9) {
      setCategory(Category.OVERWEIGHT)
    } else if (Number(bmi) >= 30 && Number(bmi) <= 34.9){
      setCategory(Category.MODERATELY_OBESE)
    } else if (Number(bmi) >= 35 && Number(bmi) <= 39.9){
      setCategory(Category.SEVERELY_OBESE)
    } else {
      setCategory(Category.MORBIDLY_OBESE)
    }
  }

  // Calculamos el BMI y la categoría cada vez que cambian los inputs
  useEffect(() => {
    let bmi = null;
    if (measurementSystem === MeasurementSystem.METRIC) {
      bmi = calculateMetricBMI();
    } else {
      bmi = calculateImperialBMI();
    }
    setBmiResult(bmi);
    if (bmi !== null) {
      checkBMI(bmi);
    }
  }, [measurementSystem, heightCm, weightKg, heightFt, heightIn, weightSt, weightLb]);

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
                  checked={measurementSystem === "metric"}
                  onChange={handleSystemChange}
                />
                Metric
              </label>
              <label className="radio__label" htmlFor="imperial">
                <input
                  name="measurement"
                  value="imperial"
                  id="imperial"
                  type="radio"
                  checked={measurementSystem === "imperial"}
                  onChange={handleSystemChange}
                />
                Imperial
              </label>
            </div>

            {measurementSystem === "metric" && (
              <div className="form__text-inputs metric">
                <div className="text-inputs__height text-input">
                  <label
                    className="measurement__label label"
                    htmlFor="height-cm"
                  >
                    Height (cm)
                  </label>
                  <input
                    id="height-cm"
                    type="text"
                    placeholder="0"
                    maxLength={3}
                    onChange={(e) => setHeightCm(parseFloat(e.target.value))}
                  />
                  <span className="placeholder-text cm">cm</span>
                </div>
                <div className="text-inputs__weight text-input">
                  <label
                    className="measurement__label label"
                    htmlFor="weight-kg"
                  >
                    Weight (kg)
                  </label>
                  <input
                    id="weight-kg"
                    type="text"
                    placeholder="0"
                    maxLength={3}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                  />
                  <span className="placeholder-text kg">kg</span>
                </div>
              </div>
            )}

            {measurementSystem === "imperial" && (
              <div className="form__text-inputs imperial">
                <div className="text-inputs__height text-input">
                  <label
                    className="measurement__label label"
                    htmlFor="height-ft"
                  >
                    Height (ft)
                  </label>
                  <input
                    id="height-ft"
                    type="text"
                    placeholder="0"
                    maxLength={1}
                    onChange={(e) => setHeightFt(parseFloat(e.target.value))}
                  />
                  <span className="placeholder-text kg">ft</span>
                </div>
                <div className="text-inputs__height text-input">
                  <label
                    className="measurement__label label"
                    htmlFor="height-in"
                  >
                    Height (in)
                  </label>
                  <input
                    id="height-in"
                    type="text"
                    placeholder="0"
                    maxLength={2}
                    onChange={(e) => setHeightIn(parseFloat(e.target.value))}
                  />
                  <span className="placeholder-text kg">in</span>
                </div>
                <div className="text-inputs__weight text-input">
                  <label
                    className="measurement__label label"
                    htmlFor="weight-st"
                  >
                    Weight (st)
                  </label>
                  <input
                    id="weight-st"
                    type="text"
                    placeholder="0"
                    maxLength={2}
                    onChange={(e) => setWeightSt(parseFloat(e.target.value))}
                  />
                  <span className="placeholder-text kg">st</span>
                </div>
                <div className="text-inputs__weight text-input">
                  <label
                    className="measurement__label label"
                    htmlFor="weight-lb"
                  >
                    Weight (lbs)
                  </label>
                  <input
                    id="weight-lb"
                    type="text"
                    placeholder="0"
                    maxLength={3}
                    onChange={(e) => setWeightLb(parseFloat(e.target.value))}
                  />
                  <span className="placeholder-text kg">lb</span>
                </div>
              </div>
            )}
          </fieldset>
        </form>

        {!bmiResult ? (
          <div className="form__result">
            <div className="result__title-wrapper">
              <h3 className="result__title welcome">Welcome!</h3>
            </div>
          
            <p className="result__text">   
              Enter your height and weight and you'll see your BMI result here.
            </p>
          </div>
        ) : (
          <div className="form__result">
          <div className="result__title-wrapper">
            <h3 className="result__title">Your BMI is...</h3>
            <span className="result__number">{bmiResult}</span>
          </div>
          
            <p className="result__text">   
            Your BMI suggest you´re a {categoty} weight. Your ideal weight is between 
              <span>
              {measurementSystem === MeasurementSystem.METRIC ? (
                <>
                  {calculateMetricBMI() !== null &&
                    `${calculateIdealWeightMetric(heightCm!).minWeight} kgs - ${calculateIdealWeightMetric(heightCm!).maxWeight} kgs`}
                </>
                ) : (
                <>
                  {calculateImperialBMI() !== null &&
                    `${calculateIdealWeightImperial(heightFt!, heightIn!).minWeightSt} st ${calculateIdealWeightImperial(
                      heightFt!,
                      heightIn!
                    ).minWeightLb} lbs - ${calculateIdealWeightImperial(heightFt!, heightIn!).maxWeightSt} st ${calculateIdealWeightImperial(
                      heightFt!,
                      heightIn!
                    ).maxWeightLb} lbs`}
                </>
              )}
              </span>
            </p>
        </div>
        )}
      </section>
    </div>
  );
};
