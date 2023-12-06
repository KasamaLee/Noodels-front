import { useState } from 'react'
import { useEffect } from 'react'
import ProductCard from './ProductCard';
import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { v4 as uuidv4 } from 'uuid';

export default function ProductList() {

    const { allProducts } = useContext(ProductContext);


    return (
        <>
            <div className='grid grid-cols-2 desktop:grid-cols-3 gap-8'>
                {allProducts?.map((productItem, index) => {
                    return (
                        <ProductCard
                            key={uuidv4()}
                            productId={productItem.id}
                            imageUrl={productItem.imageUrl}
                            name={productItem.name}
                            desc={productItem.desc}
                            price={productItem.price}
                            stockQuantity={productItem.stockQuantity}
                        // productItem={productItem}
                        // onClick={() => setSelectedProduct(productItem.name)}
                        // selectedProduct={selectedProduct}
                        />
                    )
                })}
            </div>

        </>
    )
}
