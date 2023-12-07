import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPlus, faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { CartContext } from '../../contexts/CartContext';
import { useEffect } from 'react';

export default function ProductDetail({ productId }) {

    const {
        isOpenModal,setIsOpenModal,
        selectedProductId,
        selectedProductImageUrl,
        selectedProductName,
        selectedProductDesc,
        selectedProductPrice,
        selectedProductStockQuantity
    } = useContext(ProductContext);

    const {
        productCount, setProductCount,
        cartItems, setCartItems,
        productTotalPrice, setProductTotalPrice,
        handleAddToCart
    } = useContext(CartContext);


    useEffect(() => {
        reset()
    }, [isOpenModal])

    useEffect(() => {
        calcTotalPrice()
    }, [productCount])


    const increment = () => {
        if (productCount < selectedProductStockQuantity) {
            setProductCount(productCount + 1);
        }
    }

    const decrement = () => {
        if (productCount > 1) {
            setProductCount(productCount - 1);
        }
    }

    const reset = () => {
        setProductCount(1)
    }

    const calcTotalPrice = () => {
        setProductTotalPrice(productCount * selectedProductPrice)
    }

    return (
        <div className='flex gap-8'>
            {selectedProductImageUrl ? (
                <img src={selectedProductImageUrl} className='w-[500px] object-cover rounded-xl' />
            ) : (
                <div className='bg-gray-400 w-[500px] h-[500px] rounded-xl'></div>
            )}

            <div className='flex flex-col justify-between'>
                <div className='flex flex-col gap-8'>
                    <h3 className='text-4xl'>{selectedProductName}</h3>
                    <div className='flex justify-between'>
                        <h6 className='text-lg font-normal text-gray-500'>Stock: {selectedProductStockQuantity}</h6>
                        <h6 className='text-xl text-amber-500'>{selectedProductPrice} &#3647;</h6>
                    </div>

                    <div className='flex gap-4 items-center justify-center'>
                        <FontAwesomeIcon icon={faSquareMinus} size='2x'
                            className={`cursor-pointer ${productCount <= 1 ? 'opacity-20' : 'hover:text-amber-500 active:text-amber-500 '}`}
                            onClick={() => {
                                decrement()
                                calcTotalPrice()
                            }}
                        />

                        <h4 className='text-3xl text-center text-amber-500 w-8'>{productCount}</h4>
                        <FontAwesomeIcon icon={faSquarePlus} size='2x'
                            className={`cursor-pointer ${productCount >= selectedProductStockQuantity ? 'opacity-20' : 'hover:text-amber-500 active:text-amber-500 '}`}
                            onClick={() => {
                                increment()
                                calcTotalPrice()
                            }}
                        />
                    </div>

                    <h4 className='text-2xl text-center text-amber-500'>Total Price : {productTotalPrice}</h4>
                </div>

                <button
                    className='mt-4 w-56 ring-4 ring-black text-black px-6 py-2 bg-amber-400 rounded-3xl text-2xl font-semibold flex justify-center items-center gap-2 hover:gap-4'
                    onClick={() => {
                        handleAddToCart(productId)
                        setIsOpenModal(false)
                    }}
                >
                    Add to cart
                    <FontAwesomeIcon icon={faCartShopping} size='1x' />
                </button>
            </div>
        </div>
    )
}
