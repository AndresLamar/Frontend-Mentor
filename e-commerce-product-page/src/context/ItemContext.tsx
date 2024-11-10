import React, { createContext, useContext, useEffect, useState} from "react";
import { Image } from "../assets/images/exportImages";


interface Item{
    image: Image;
    title: string;
    price: number;
    quantity: number;
}

interface ItemContextProps {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    item: Item | null;
    setItem: React.Dispatch<React.SetStateAction<Item | null>>
}

export const ItemContext = createContext<ItemContextProps>({
    quantity: 0,
    setQuantity: () => {},
    item: null,
    setItem: () => {}
})

export const ItemProvider = ({children} : {children: React.ReactNode}) => {
    const [quantity, setQuantity] = useState(0);
    const [item, setItem ] = useState<Item | null>(null)

    useEffect(() => {
        console.log(item);
        
    },[item])

    return (
        <ItemContext.Provider value={{quantity, setQuantity, item, setItem}}>
            {children}
        </ItemContext.Provider>
    )
}

export function useItem() {
    return useContext(ItemContext);
}




