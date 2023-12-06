import { useState } from 'react'
import { useEffect } from 'react'
import ProductCard from './ProductCard';
import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { v4 as uuidv4 } from 'uuid';
import NoodlesAnimation from '../../components/NoodlesAnimation';

export default function ProductList() {

    const { allProducts, filteredProducts } = useContext(ProductContext);


    return (
        <>
            {/* {allProducts.countryId == } */}
            <div className='grid grid-cols-2 desktop:grid-cols-3 gap-8'>
                {filteredProducts && filteredProducts.length > 0 ? (
                    filteredProducts?.map((productItem) => {
                        return (
                            <ProductCard
                                key={uuidv4()}
                                productId={productItem.id}
                                imageUrl={productItem.imageUrl}
                                name={productItem.name}
                                desc={productItem.desc}
                                price={productItem.price}
                                stockQuantity={productItem.stockQuantity}
                            />
                        )
                    })
                ) : filteredProducts && filteredProducts.length === 0 ? (
                    <div className='col-span-full '>
                        <h4 className='text-center text-lg text-gray-500'>Product Not Found :\ </h4>
                        <NoodlesAnimation />
                    </div>
                ) : (
                    allProducts?.map((productItem) => {
                        return (
                            <ProductCard
                                key={uuidv4()}
                                productId={productItem.id}
                                imageUrl={productItem.imageUrl}
                                name={productItem.name}
                                desc={productItem.desc}
                                price={productItem.price}
                                stockQuantity={productItem.stockQuantity}
                            />
                        )
                    })
                )}


            </div>

        </>
    )
}
