import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/Modal';
import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { useState } from 'react';
import ConfirmDelete from '../../components/ConfirmDelete';
import AdminProductDetail from './AdminProductDetail';
import { useEffect } from 'react';


export default function AdminProductCard({ id, desc, imageUrl, name, price, stockQuantity, categoryId }) {

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

    const {
        isOpenModal, setIsOpenModal,
        setSelectedProductId,
        setSelectedProductImageUrl,
        setSelectedProductName,
        setSelectedProductDesc,
        setSelectedProductPrice,
        setSelectedProductStockQuantity,
        setSelectedCategoryId,
        handleDeleteProduct,
        resetSelectedProductData
    } = useContext(ProductContext);

    useEffect(() => {
        if (!isOpenModal) {
            resetSelectedProductData();
        }
    }, [isOpenModal])

    return (
        <>
            <div className="p-6 grow flex flex-col items-center gap-8 ring-4 ring-gray-500 bg-white rounded-xl overflow-hidden">

                <div className='w-full flex gap-4 items-center card-info'>
                    {imageUrl ? (
                        <img src={imageUrl} alt='cartItem image' className='w-24 h-24 aspect-square object-cover rounded-lg' />
                    ) : (
                        <div className='bg-gray-400 w-24 h-24 aspect-square rounded-xl'></div>
                    )}

                    <div className='grow flex flex-col'>
                        <p className='text-lg font-semibold'>{name}</p>
                        <p>Price: {price}</p>
                        <p>Stock : {stockQuantity}</p>
                    </div>
                </div>

                <div className='flex gap-6'>
                    <button
                        onClick={() => {
                            setSelectedProductId(id)
                            setSelectedProductImageUrl(imageUrl)
                            setSelectedProductName(name)
                            setSelectedProductDesc(desc)
                            setSelectedProductPrice(price)
                            setSelectedProductStockQuantity(stockQuantity)
                            setSelectedCategoryId(categoryId)
                            setIsOpenModal(true)
                        }}
                        className='w-20 text-sm ring-2 ring-black text-black px-3 py-1 bg-gray-300 rounded-full flex justify-center items-center gap-1 hover:text-blue-500 hover:ring-blue-500'>
                        Edit <FontAwesomeIcon icon={faEdit} size='1x' />
                    </button>
                    <button
                        onClick={() => {
                            // setDeletingItemId(id)
                            setIsOpenDeleteModal(true)
                        }}
                        className='w-20 text-sm ring-2 ring-black text-black px-3 py-1 bg-gray-300 rounded-full flex justify-center items-center gap-1 hover:text-red-500 hover:ring-red-500'>
                        Delete <FontAwesomeIcon icon={faTrash} size='1x' />
                    </button>
                </div>
            </div>


            <Modal z={'z-20'} isOpenModal={isOpenDeleteModal} onCloseModal={() => setIsOpenDeleteModal(false)}>
                <ConfirmDelete
                    handleDelete={() => handleDeleteProduct(id)}
                    setIsOpenModal={setIsOpenDeleteModal}
                />
            </Modal>
        </ >
    )
}
