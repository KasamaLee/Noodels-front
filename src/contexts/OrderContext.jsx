import { useState } from 'react';
import { createContext } from 'react'
import { CartContext } from './CartContext';
import { useContext } from 'react';
import { useEffect } from 'react';

export const OrderContext = createContext();

export default function OrderContextProvider({ children }) {

    const [selectedItems, setSelectedItems] = useState([])
    const [selectedTotalPrice, setSelectedTotalPrice] = useState(0);
    const { cartData, setCartData } = useContext(CartContext)

    const [selectedItemId, setSelectedItemsId] = useState([])
    console.log('cartItem', cartData?.CartItem)
    console.log(selectedItems)

    useEffect(() => {
        filterItem()
    }, [])

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

    const handleChecked = (itemId) => {
        let newSelectedItemsId = selectedItemId;

        if (selectedItemId.includes(itemId)) {
            // Unchecked ==> Remove
            newSelectedItemsId = selectedItemId.filter(id => id !== itemId)
        } else {
            // Checked ==> Add
            newSelectedItemsId = [...selectedItemId, itemId]
        }
        setSelectedItemsId(newSelectedItemsId)
    }

    const calTotalPrice = (selectedItem) => {
        let newTotalPrice = 0
        if (!selectedItems) return
        for (let item of selectedItems) {
            newTotalPrice += item.price
        }
        setSelectedTotalPrice(newTotalPrice)
    }

    const filterItem = () => {
        // let result = []
        // for (let i = 0; i < cartData?.CartItem.length; i++) {
        //     for (let j = 0; j < selectedItemId.length; j++) {
        //         if (cartData?.CartItem[i].id === selectedItemId[j]) {
        //             result.push(cartData?.CartItem[i]);
        //             break;
        //         }
        //     }
        // }

        const result = cartData?.CartItem.filter((eachItem) => selectedItemId.includes(eachItem.id))

        let newTotalPrice = 0
        // if (result) {
        //     for (let item of result) {
        //         newTotalPrice += item.price
        //     }
        // } 
        result?.forEach(item => newTotalPrice += item.price)

        setSelectedTotalPrice(newTotalPrice)
        setSelectedItems(result)
    }


    return (
        <OrderContext.Provider
            value={{
                selectedItems, setSelectedItems,
                handleCheckbox,
                selectedTotalPrice, setSelectedTotalPrice,
                selectedItemId, setSelectedItemsId,
                handleChecked,
                filterItem,
                calTotalPrice
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}