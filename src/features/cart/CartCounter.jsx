import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { ProductContext } from '../../contexts/ProductContext';
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from '../../components/Modal';


export default function CartCounter({ id, initialQuantity, maxQuantity, price }) {

    const [currentQuantity, setCurrentQuantity] = useState(initialQuantity);
    const [currentPrice, setCurrentPrice] = useState(price)

    const { isOpenModal, setIsOpenModal } = useContext(ProductContext)
    const { handleUpDateQuantity } = useContext(CartContext)

    useEffect(() => {
        calcTotalPrice()
    }, [currentQuantity]);


    const increment = () => {
        if (currentQuantity < maxQuantity) {
            setCurrentQuantity(currentQuantity + 1)
        }
    }

    const decrement = () => {

        if (currentQuantity > 1) {
            setCurrentQuantity(currentQuantity - 1)
        } else {
            setIsOpenModal(true)
        }
    }

    const calcTotalPrice = () => {
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

            <Modal isOpenModal={isOpenModal} onCloseModal={() => setIsOpenModal(!isOpenModal)}>
                <h4 className='text-3xl text-center text-amber-500'>Delete Product?</h4>
                <button
                    className='ml-6 text-sm ring-2 ring-black text-black px-3 py-1 bg-gray-300 rounded-3xl flex justify-center items-center gap-1'>
                    Delete
                    <FontAwesomeIcon icon={faTrash} size='1x' />
                </button>
            </Modal>
        </>
    )
}
