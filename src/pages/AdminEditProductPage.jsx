import React from 'react'
import { useContext } from 'react'
import { ProductContext } from '../contexts/ProductContext'
import { v4 as uuidv4 } from 'uuid';
import AdminProductCard from '../features/admin/AdminProductCard';
import AdminCategory from '../features/admin/AdminCategory';
import NoodlesAnimation from '../components/NoodlesAnimation';
import Modal from '../components/Modal';
import AdminProductDetail from '../features/admin/AdminProductDetail';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDolly } from '@fortawesome/free-solid-svg-icons';

export default function AdminEditProductPage() {

    const { allProducts, filteredProducts, isOpenModal, setIsOpenModal, selectedProductId, resetSelectedProductData } = useContext(ProductContext)
    console.log(allProducts)
    // console.log(filteredProducts)


    useEffect(() => {
        if (!isOpenModal) {
            resetSelectedProductData();
        }
    }, [isOpenModal])

    return (
        <section className='section py-28'>
            <div className='container flex flex-col items-center justify-center gap-8'>
                <h4 className='text-3xl'>Product</h4>
                <AdminCategory />

                <button
                    className='w-1/2 ring-4 ring-black text-black p-4 bg-amber-400 rounded-xl text-2xl font-semibold flex justify-center items-center gap-3 hover:gap-6'
                    onClick={() => setIsOpenModal(true)}
                >
                    Add new product
                    <FontAwesomeIcon icon={faDolly} size='xl' />
                </button>

                <div className='grid grid-cols-2 desktop:grid-cols-3 gap-8'>

                    {filteredProducts && filteredProducts.length > 0 ? (
                        filteredProducts?.map((eachProduct) => {
                            return (
                                <AdminProductCard
                                    key={uuidv4()}
                                    id={eachProduct.id}
                                    desc={eachProduct.desc}
                                    imageUrl={eachProduct.imageUrl}
                                    name={eachProduct.name}
                                    price={eachProduct.price}
                                    stockQuantity={eachProduct.stockQuantity}
                                    categoryId={eachProduct.countryId}
                                />
                            )
                        })
                    ) : filteredProducts && filteredProducts.length == 0 ? (
                        <div className='col-span-full '>
                            <h4 className='text-center text-lg text-gray-500'>Product Not Found :\ </h4>
                            <NoodlesAnimation />
                        </div>
                    ) : (
                        allProducts?.map((eachProduct) => {
                            return (
                                <AdminProductCard
                                    key={uuidv4()}
                                    id={eachProduct.id}
                                    desc={eachProduct.desc}
                                    imageUrl={eachProduct.imageUrl}
                                    name={eachProduct.name}
                                    price={eachProduct.price}
                                    stockQuantity={eachProduct.stockQuantity}
                                    categoryId={eachProduct.countryId}
                                />
                            )
                        })
                    )}
                </div>
            </div>

            <Modal isOpenModal={isOpenModal} onCloseModal={() => setIsOpenModal(false)}>
                <AdminProductDetail />
            </Modal>

        </section>
    )
}
