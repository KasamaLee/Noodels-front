import { useState } from 'react';
import { createContext } from 'react'

export const OrderContext = createContext();

export default function OrderContextProvider({ children }) {

    const [selectedItems, setSelectedItems] = useState([])
    const [selectedTotalPrice, setSelectedTotalPrice] = useState(0);

    const handleCheckbox = (selectedItem) => {
        let newSelectedItems = selectedItems;
        let newTotalPrice = selectedTotalPrice;

        if (selectedItems.includes(selectedItem)) {
            // Unchecked ==> Remove
            newSelectedItems = selectedItems.filter(item => item !== selectedItem)
            newTotalPrice -= selectedItem.price;
        } else {
            // Checked ==> Add
            newSelectedItems = [...selectedItems, selectedItem]
            newTotalPrice += selectedItem.price;
        }
        setSelectedItems(newSelectedItems)
        setSelectedTotalPrice(newTotalPrice)
    }


    return (
        <OrderContext.Provider
            value={{
                selectedItems, setSelectedItems,
                handleCheckbox,
                selectedTotalPrice, setSelectedTotalPrice,
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}