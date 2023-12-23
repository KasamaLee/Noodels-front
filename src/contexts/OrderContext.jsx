import { useState } from 'react';
import { createContext } from 'react'

export const OrderContext = createContext();

export default function OrderContextProvider({ children }) {

    const [selectedItems, setSelectedItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);

    const handleCheckbox = (selectedId) => {
        if (selectedItems.includes(selectedId)) {
            // Unchecked ==> Remove
            setSelectedItems(selectedItems.filter(id => id !== selectedId))
        } else {
            setSelectedItems([...selectedItems, selectedId])
        }
    }
    console.log(selectedItems)

    return (
        <OrderContext.Provider
            value={{
                selectedItems, setSelectedItems,
                handleCheckbox
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}