import React, { createContext, useContext, useState} from "react";

interface QuantityContextProps {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const QuantityContext = createContext<QuantityContextProps>({
    quantity: 0,
    setQuantity: () => {},
    
})

export const QuantityProvider = ({children} : {children: React.ReactNode}) => {
    const [quantity, setQuantity] = useState(0);

    return (
        <QuantityContext.Provider value={{quantity, setQuantity}}>
            {children}
        </QuantityContext.Provider>
    )
}

export function useQuantity() {
    return useContext(QuantityContext);
}




