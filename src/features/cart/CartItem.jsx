import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import CartCounter from './CartCounter';
import { useState } from 'react';
import { OrderContext } from '../../contexts/OrderContext';
import { ProductContext } from '../../contexts/ProductContext';
import Modal from '../../components/Modal';


export default function CartItem({ eachCart }) {
    
    const { selectedItems, handleCheckbox } = useContext(OrderContext);
    const { handleDeleteCartItem, deletingItemId, setDeletingItemId } = useContext(CartContext);
    const { isOpenModal, setIsOpenModal } = useContext(ProductContext)
    

    const initialQuantity = eachCart.quantity;
    const maxQuantity = eachCart.product.stockQuantity;

    return (
        <div className='relative flex items-center w-2/3 gap-6'>
            <div className="relative p-6 grow flex items-center gap-8 ring-4 ring-gray-500 bg-white rounded-xl overflow-hidden">

                <img src={eachCart.product.imageUrl} alt='cartItem image' className='w-24 h-24 object-cover rounded-lg' />

                <div className='grow flex flex-col'>
                    <p className='text-lg font-semibold'>{eachCart.product.name}</p>
                    <p><span>&#215;</span> {initialQuantity}</p>
                    <p>Price: {eachCart.price}</p>
                </div>

                {maxQuantity > 0 ? (
                    <>
                        <CartCounter
                            id={eachCart.id}
                            initialQuantity={initialQuantity}
                            maxQuantity={maxQuantity}
                            totalPrice={eachCart.price}
                            price={eachCart.product.price}
                        />
                    </>
                ) : (
                    <div className='absolute z-10 w-full h-full left-0 top-0 flex items-center justify-center'>
                        <h4 className='z-10 text-2xl text-center text-red-900'>Temporary out of stock</h4>
                        <div className='absolute bg-red-300 opacity-60 w-full h-full '>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => {
                        setDeletingItemId(eachCart.id)
                        setIsOpenModal(true)
                    }}
                    className='z-10 ml-6 text-sm ring-2 ring-black text-black px-3 py-1 bg-gray-300 rounded-3xl flex justify-center items-center gap-1 hover:text-red-500 hover:ring-red-500'>
                    Delete <FontAwesomeIcon icon={faTrash} size='1x' />
                </button>
            </div>

            {maxQuantity > 0 &&
                <input
                    className='absolute -right-14 w-6 h-6 accent-amber-600 border-2 bg-gray-100 border-gray-300 rounded-lg focus:ring-amber-500 dark:focus:ring-amber-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    type="checkbox"
                    // checked={true}
                    checked={selectedItems.includes(eachCart)}
                    onChange={() => handleCheckbox(eachCart)}
                />
            }

            <Modal isOpenModal={isOpenModal} onCloseModal={() => setIsOpenModal(!isOpenModal)}>
                <div className='flex flex-col items-center gap-4'>
                    <h4 className='text-3xl text-center text-amber-500'>Delete Product?</h4>
                    <button
                        className='ml-6 text-sm ring-2 ring-black text-black px-3 py-1 bg-gray-300 rounded-3xl flex justify-center items-center gap-1'
                        onClick={() => {
                            handleDeleteCartItem(deletingItemId)
                            setIsOpenModal(false)
                        }}
                    >
                        Delete
                        <FontAwesomeIcon icon={faTrash} size='1x' />
                    </button>
                </div>
            </Modal>
        </div >

    )
}
