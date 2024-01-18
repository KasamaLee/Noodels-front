import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSquarePlus, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { CartContext } from '../../contexts/CartContext';
import { useEffect } from 'react';
import SuccessAnimation from '../../components/SuccessAnimation'
import { useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';


export default function ProductDetail({ productId }) {

    const {
        isOpenModal, setIsOpenModal,
        selectedProductId,
        selectedProductImageUrl,
        selectedProductName,
        selectedProductDesc,
        selectedProductPrice,
        selectedProductStockQuantity, setSelectedProductStockQuantity,
        handleSuccessAnimation,
    } = useContext(ProductContext);

    const {
        cartData,
        productCount, setProductCount,
        productTotalPrice, setProductTotalPrice,
        handleAddToCart,
        handleUpDateQuantity
    } = useContext(CartContext);

    const { authUser, setIsOpenLoginModal } = useContext(AuthContext)

    const [showQuantityError, setShowQuantityError] = useState(false)
    const [availableQuantity, setAvailableQuantity] = useState(selectedProductStockQuantity)
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);


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
        calcTotalPrice()
    }

    const decrement = () => {
        if (productCount > 1) {
            setProductCount(productCount - 1);
        }
        calcTotalPrice()
    }

    const reset = () => {
        setProductCount(1)
    }

    const calcTotalPrice = () => {
        setProductTotalPrice(productCount * selectedProductPrice)
    }


    const addToCart = () => {
        if (!authUser) {
            return setIsOpenLoginModal(true)
        }

        const existedCartItem = cartData?.CartItem.find(item => (item.productId) === (selectedProductId))
        if (existedCartItem) {
            const newAvailableQuantity = selectedProductStockQuantity - existedCartItem.quantity
            setAvailableQuantity(newAvailableQuantity);
            // console.log('เลือกได้', newAvailableQuantity, 'ชิ้น')

            if (productCount > newAvailableQuantity) {
                setShowQuantityError(true)
                return
            }

            const newQuantity = existedCartItem.quantity + productCount;
            const newTotalPrice = existedCartItem.price + productTotalPrice
            handleUpDateQuantity(existedCartItem.id, newQuantity, newTotalPrice)

        } else {
            handleAddToCart(selectedProductId)
        }

        setShowSuccessAnimation(true)
        setTimeout(() => {
            setShowSuccessAnimation(false)
            setIsOpenModal(false)
        }, 600)
    }

    return (
        <div className='flex gap-8 relative'>
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
                            }}
                        />

                        <h4 className='text-3xl text-center text-amber-500 w-8'>{productCount}</h4>
                        <FontAwesomeIcon icon={faSquarePlus} size='2x'
                            className={`cursor-pointer ${productCount >= selectedProductStockQuantity ? 'opacity-20' : 'hover:text-amber-500 active:text-amber-500 '}`}
                            onClick={() => {
                                increment()
                            }}
                        />
                    </div>

                    <h4 className='text-2xl text-center text-amber-500'>Total Price : {productTotalPrice}</h4>
                </div>

                {showQuantityError &&
                    <p className='text-xl text-center text-red-600'>
                        ตะกร้าสินค้าเกินกำหนด
                        <br />เพิ่มสินค้าได้ {availableQuantity} ชิ้น
                    </p>
                }

                <button
                    className='mt-4 w-56 ring-4 ring-black text-black px-6 py-2 bg-amber-400 rounded-3xl text-2xl font-semibold flex justify-center items-center gap-2 hover:gap-4'
                    onClick={() => addToCart()}
                >
                    Add to cart
                    <FontAwesomeIcon icon={faCartShopping} size='1x' />
                </button>
            </div>

            <SuccessAnimation
                width={380}
                height={380}
                isSuccess={showSuccessAnimation}
            />

        </div>
    )
}
