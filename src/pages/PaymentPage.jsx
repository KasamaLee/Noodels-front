import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faCreditCard, faUpload, faImage, faTruckFast, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect } from 'react';
import { useContext } from 'react';
import { OrderContext } from '../contexts/OrderContext';
import OrderItem from '../features/order/OrderItem';
import { v4 as uuidv4 } from 'uuid';
import Modal from '../components/Modal';
import QR from '../assets/images/Qr.jpg'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../config/axios'
import { toast } from 'react-toastify';



const stripePromise = loadStripe("pk_test_51O2AMAI47xWQxVGV0k99tPraKxItkbJFMTM62NF3usuyiwNFePFcAYZnb6MZjguJk8FYxZzzmqyY4pW7FBXAtl6K00fCGDlTNi");

export default function PaymentPage() {

    const [isOpenCredit, setIsOpenCredit] = useState(false);
    const [clientSecret, setClientSecret] = useState("");

    const { initialLoading, setInitialLoading, authUser } = useContext(AuthContext)
    const { selectedItems, selectedTotalPrice, filterItem } = useContext(OrderContext);
    // console.log(selectedItems)

    const [isOpenQrModal, setIsOpenQrModal] = useState(false)
    const [file, setFile] = useState(null)
    const inputEl = useRef(null);

    const handleCreateOrder = async () => {
        try {
            setInitialLoading(true)
            const reqBody = new FormData();
            reqBody.append('paymentType', 'QR_CODE');
            reqBody.append('image', file);
            reqBody.append('totalPrice', selectedTotalPrice)
            reqBody.append('orderItems', JSON.stringify(selectedItems));

            // for (let [key, value] of reqBody.entries()) {
            //     console.log(key, value);
            // }

            const response = await axios.post('/order/create', reqBody);
            if (response.status === 200) {
                toast.success('your order is completed :)')
            }
        } catch (err) {
            toast.success("sorry, your order is not completed :(")
        } finally {
            setInitialLoading(false)
        }
    }

    useEffect(() => {
        filterItem()
    }, [])

    useEffect(() => {
        resetFile()
    }, [isOpenQrModal])

    const handleFile = (e) => {
        console.log(e.target.files[0])
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const resetFile = () => {
        setFile(null)
    }

    const navigate = useNavigate()


    return (
        <section className='section py-28'>
            <div className='container flex flex-col items-center justify-center gap-8'>
                <h4 className='text-3xl'>Your order</h4>

                {selectedItems?.map(eachCart => {
                    return (
                        <OrderItem
                            key={uuidv4()}
                            id={eachCart.id}
                            imageUrl={eachCart.product.imageUrl}
                            name={eachCart.product.name}
                            totalPrice={eachCart.price}
                            quantity={eachCart.quantity}
                        />
                    )
                })}
                <h4 className='text-2xl w-2/3 text-amber-600 text-left'>Total Price : {selectedTotalPrice}</h4>

                <div className='w-2/3 text-left flex gap-4'>
                    <p className='font-semibold '>Delivery To : </p>
                    {authUser?.address ? (
                        <p>{authUser?.address}</p>
                    ) : (
                        <button
                            className='ring-2 ring-black text-black px-4 py-1 bg-amber-400 rounded-full text-sm font-semibold flex justify-center items-center gap-1 hover:gap-2'
                            onClick={() => navigate('/profile')}
                        >
                            add your address
                            <FontAwesomeIcon icon={faLocationDot} size='1x' />
                        </button>
                    )}
                </div>

            </div>

            <div className='container pt-12 flex flex-col items-center gap-6'>
                <h4 className='text-3xl'>Payment method</h4>
                <div className='flex justify-center gap-16'>
                    <div className='bg-white ring-4 ring-gray-500 py-10 w-48 rounded-xl cursor-pointer flex items-center justify-center gap-4 hover:ring-amber-400'>
                        <FontAwesomeIcon icon={faCreditCard} size='2xl' />
                        Credit Card
                    </div>

                    {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    )}

                    <div
                        className='bg-white ring-4 ring-gray-500 py-10 w-48 rounded-xl cursor-pointer flex items-center justify-center gap-4 hover:ring-amber-400'
                        onClick={() => setIsOpenQrModal(true)}
                    >
                        <FontAwesomeIcon icon={faQrcode} size='2xl' />
                        Qr Code
                    </div>
                </div>
            </div>

            <Modal isOpenModal={isOpenQrModal} onCloseModal={() => setIsOpenQrModal(false)}>
                <div className='flex'>
                    <img src={QR} alt='Qr code' className='w-96 border-2 rounded-xl' />
                    <div className='w-96 flex flex-col items-center justify-center gap-6'>
                        <div className='bg-gray-300 h-96 w-80 rounded-2xl border-2 overflow-hidden flex items-center justify-center'>
                            {file ? (
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt='uploaded image'
                                    className='w-full h-full object-cover'
                                />
                            ) : (
                                <FontAwesomeIcon icon={faImage} size='4x' className='text-gray-400' />
                            )}
                        </div>

                        <button
                            className='ring-4 ring-black text-black px-4 py-2 bg-amber-400 rounded-full text-xl font-semibold flex justify-center items-center gap-2 hover:gap-4'
                            onClick={() => inputEl.current.click()}
                        >
                            Upload slip
                            <FontAwesomeIcon icon={faUpload} size='1x' />
                        </button>

                        <button
                            className={`${!file && 'invisible'} ring-4 ring-black text-black px-4 py-2 bg-green-500 rounded-full text-xl font-semibold flex justify-center items-center gap-2 hover:gap-4`}
                            onClick={() => {
                                handleCreateOrder()
                                navigate('/order')
                            }}
                        >
                            Submit
                            <FontAwesomeIcon icon={faTruckFast} size='1x' />
                        </button>

                        <input
                            ref={inputEl}
                            className='hidden'
                            type="file"
                            onChange={e => handleFile(e)}
                        />
                    </div>
                </div>
            </Modal>

        </section>
    )
}
