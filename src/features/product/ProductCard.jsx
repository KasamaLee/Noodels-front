import React from 'react'
import { useState } from 'react';
import Modal from '../../components/Modal';
import ProductDetail from './ProductDetail';
import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';

export default function ProductCard({ productId, imageUrl, name, desc, price, stockQuantity }) {

    const {
        isOpenModal, setIsOpenModal,
        setSelectedProductId,
        setSelectedProductImageUrl,
        setSelectedProductName,
        setSelectedProductDesc,
        setSelectedProductPrice,
        setSelectedProductStockQuantity
    } = useContext(ProductContext);

    return (
        <>
            <div
                className='rounded-2xl overflow-hidden bg-white ring-4 ring-gray-500 p-4 flex flex-col gap-4 cursor-pointer hover:ring-amber-400'
                onClick={() => {
                    setSelectedProductId(productId)
                    setSelectedProductImageUrl(imageUrl)
                    setSelectedProductName(name)
                    setSelectedProductDesc(desc)
                    setSelectedProductPrice(price)
                    setSelectedProductStockQuantity(stockQuantity)
                    setIsOpenModal(true)
                }}
            >
                {imageUrl ? (
                    <img src={imageUrl} className='w-full h-64 object-cover rounded-xl' />
                ) : (
                    <div className='bg-gray-400 w-full h-64 rounded-xl'></div>
                )}

                <div className='flex flex-col gap-2 px-2'>
                    <h4 className='text-2xl text-center'>{name}</h4>
                    {/* <p className='text-gray-500'>Lorem ipsum</p> */}
                    <div className='flex justify-between'>
                        <h6 className='text-lg font-normal text-gray-500'>Stock: {stockQuantity}</h6>
                        <h6 className='text-xl text-amber-500'>{price} &#3647;</h6>
                    </div>
                </div>
            </div>

            <Modal isOpenModal={isOpenModal} onCloseModal={() => setIsOpenModal(!isOpenModal)}>
                <ProductDetail/>
            </Modal>
        </>
    )
}
