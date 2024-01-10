import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { ProductContext } from '../../contexts/ProductContext';
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from '../../components/Modal';


export default function CartCounter({ id, initialQuantity, maxQuantity, totalPrice, price }) {


    const [currentQuantity, setCurrentQuantity] = useState(initialQuantity);
    const [currentPrice, setCurrentPrice] = useState(totalPrice)

    const { isOpenModal, setIsOpenModal } = useContext(ProductContext)
    const { handleUpDateQuantity, deletingItemId, setDeletingItemId } = useContext(CartContext)


    const increment = () => {
        if (currentQuantity < maxQuantity) {
            setCurrentQuantity((prevQuantity) => {
                const newQuantity = prevQuantity + 1
                const newPrice = newQuantity * price

                setCurrentPrice(newPrice)
                handleUpDateQuantity(id, newQuantity, newPrice)
                return newQuantity
            })
        }
    }

    const decrement = () => {
        if (currentQuantity > 1) {
            setCurrentQuantity(prevQuantity => {
                const newQuantity = prevQuantity - 1
                const newPrice = newQuantity * price

                setCurrentPrice(newPrice)
                handleUpDateQuantity(id, newQuantity, newPrice)
                return newQuantity
            })
        } else {
            setDeletingItemId(id)
            setIsOpenModal(true)
        }
    }

    const calcTotalPrice = (quantity) => {
        setCurrentPrice(currentQuantity * price)
    }


    return (
        <>
            <div className='flex gap-4 items-center justify-center'>
                <FontAwesomeIcon icon={faSquareMinus} size='2x'
                    className={`cursor-pointer ${currentQuantity <= 0 ? 'opacity-20' : 'hover:text-amber-500 active:text-amber-500'}`}
                    onClick={decrement}
                />

                <h4 className='text-3xl text-center text-amber-500 w-8'>{currentQuantity}</h4>

                <FontAwesomeIcon icon={faSquarePlus} size='2x'
                    className={`cursor-pointer ${currentQuantity >= maxQuantity ? 'opacity-20' : 'hover:text-amber-500 active:text-amber-500'}`}
                    onClick={increment}
                />
            </div>


        </>
    )
}
