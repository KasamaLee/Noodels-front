import React from 'react'
import { useContext } from 'react'
import { ProductContext } from '../contexts/ProductContext'
import { v4 as uuidv4 } from 'uuid';
import AdminProductCard from '../features/admin/AdminProductCard';
import Modal from '../components/Modal';
import { useState } from 'react';
import AdminCategory from '../features/admin/AdminCategory';


export default function AdminEditProductPage() {

    const { allProducts, selectedProductId } = useContext(ProductContext)
    // console.log(allProducts)

    return (
        <section className='section py-28'>
            <div className='container flex flex-col items-center justify-center gap-8'>
                <h4 className='text-3xl'>Product</h4>
                <AdminCategory />

                <button className='mx-auto w-80 ring-4 ring-black text-black px-6 py-2 bg-amber-400 rounded-xl text-2xl font-semibold flex justify-center items-center gap-2 hover:gap-4'>
                    Add new product
                </button>

                <div className='grid grid-cols-2 desktop:grid-cols-3 gap-8'>
                    {allProducts?.map(eachProduct => {
                        return (
                            <AdminProductCard
                                key={uuidv4()}
                                countryId={eachProduct.countryId}
                                id={eachProduct.id}
                                desc={eachProduct.desc}
                                imageUrl={eachProduct.imageUrl}
                                name={eachProduct.name}
                                price={eachProduct.price}
                                stockQuantity={eachProduct.stockQuantity}
                            />
                        )
                    })}
                </div>
            </div>

        </section>
    )
}
