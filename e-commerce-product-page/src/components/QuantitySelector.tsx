import { useEffect, useRef } from "react"
import { MinusIcon, PlusIcon } from "./Icons"
import { useQuantity } from "../context/QuantityContext";

const QuantitySelector = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { quantity, setQuantity } = useQuantity()

    useEffect(() => {
        if(inputRef.current){
            inputRef.current.value = String(quantity);
        }
    }, [quantity])

    const handleIncrease = () => {
        if (inputRef.current) {
            setQuantity(quantity + 1)
        }
    }

    const handleDecrease = () => {
        if (inputRef.current && quantity > 0) {
            setQuantity(quantity - 1);
        }
    }

    const handleInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10);

        if (!isNaN(newValue) && newValue >= 0) {
            setQuantity(newValue)
        } else if (e.target.value === "") {
            setQuantity(0)
        }
    };

    return (
        <div className="quantity-selector">
            <div className="quantity-field">
              <label htmlFor="quantity-input" aria-hidden="true" hidden>
                Enter Number of items
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity-input"
                className="quantity-input"
                placeholder="0"
                min="0"
                ref={inputRef}
                onChange={handleInput}
              />
            </div>
            <button
                type="button"
                className="quantity-decrease quantity-btn"
                aria-label="Decrease quantity"
                onClick={handleDecrease}
            >
                <MinusIcon />
            </button>
            <button
                type="button"
                className="quantity-increase quantity-btn"
                aria-label="Increase quantity"
                onClick={handleIncrease}
            >
                <PlusIcon />
            </button>
          </div>
    )
}

export default QuantitySelector