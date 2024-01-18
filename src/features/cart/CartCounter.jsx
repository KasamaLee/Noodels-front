import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { ProductContext } from '../../contexts/ProductContext';
import { useState } from 'react';
import ClickEffect from '../../components/ClickEffect';
import { useEffect } from 'react';


export default function CartCounter({ id, initialQuantity, maxQuantity, totalPrice, price }) {


    const [currentQuantity, setCurrentQuantity] = useState(initialQuantity);
    const [currentPrice, setCurrentPrice] = useState(totalPrice)

    const { isOpenModal, setIsOpenModal } = useContext(ProductContext)
    const { handleUpDateQuantity, deletingItemId, setDeletingItemId, fetchCart } = useContext(CartContext)

    const [showIncrementAnimation, setShowIncrementAnimation] = useState(false);
    const [showDecrementAnimation, setShowDecrementAnimation] = useState(false);



    const increment = () => {
        if (currentQuantity < maxQuantity) {
            setShowIncrementAnimation(true);

            setCurrentQuantity((prevQuantity) => {
                const newQuantity = prevQuantity + 1
                const newPrice = newQuantity * price

                setCurrentPrice(newPrice)
                setTimeout(() => {
                    setShowIncrementAnimation(false);
                    handleUpDateQuantity(id, newQuantity, newPrice)
                }, 200);
                return newQuantity
            })
        }
    }

    const decrement = () => {
        if (currentQuantity > 1) {
            setShowDecrementAnimation(true)
            setCurrentQuantity(prevQuantity => {
                const newQuantity = prevQuantity - 1
                const newPrice = newQuantity * price
                setCurrentPrice(newPrice)

                setTimeout(() => {
                    setShowDecrementAnimation(false)
                    handleUpDateQuantity(id, newQuantity, newPrice)
                }, 200)
                return newQuantity
            })
        } else {
            setDeletingItemId(id)
            setIsOpenModal(true)
        }
    }


    return (
        <div className='flex gap-4 items-center justify-center relative'>
            <FontAwesomeIcon icon={faSquareMinus} size='2x'
                className={`cursor-pointer text-gray-600 ${currentQuantity <= 0 ? 'opacity-20' : 'hover:text-amber-500 active:text-amber-500'}`}
                onClick={decrement}
            />
            <ClickEffect
                width={300}
                height={300}
                isClick={showDecrementAnimation}
                classPosition={'-left-[136px]'}
            />

            <h4 className='text-3xl text-center text-amber-500 w-8'>{currentQuantity}</h4>

            <FontAwesomeIcon icon={faSquarePlus} size='2x'
                className={`cursor-pointer text-gray-600 ${currentQuantity >= maxQuantity ? 'opacity-20' : 'hover:text-amber-500 active:text-amber-500'}`}
                onClick={increment}
            />
            <ClickEffect
                width={300}
                height={300}
                isClick={showIncrementAnimation}
                classPosition={'-right-[136px]'}
            />
        </div>

    )
}