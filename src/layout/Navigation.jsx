import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

export default function Navigation() {

	const { authUser, isOpenLoginModal, setIsOpenLoginModal } = useContext(AuthContext);
	const { cartData, fetchCart } = useContext(CartContext);
	const navigate = useNavigate();

    useEffect(() => {
        if (authUser) fetchCart()
    }, [authUser])

    return (
        <nav>
            <ul className='flex gap-2 text-lg font-medium'>
                <li
                    className={`cursor-pointer flex justify-center items-center px-3 py-1 gap-1 hover:ring-white hover:ring-2 hover:rounded-3xl`}
                    onClick={() => {
                        navigate('/')
                    }}>
                    Home
                </li>
                <li
                    className={`cursor-pointer flex justify-center items-center px-3 py-1 gap-1 hover:ring-white hover:ring-2 hover:rounded-3xl`}
                    onClick={() => {
                        navigate('/contact')
                    }}>
                    Contact
                </li>
                {authUser &&
                    <li
                        className={`relative cursor-pointer flex justify-center items-center px-3 py-1 gap-1 hover:ring-white hover:ring-2 hover:rounded-3xl`}
                        onClick={() => {
                            navigate('/cart')
                        }}>
                        {cartData?.CartItem.length > 0 &&
                            <div className='absolute bg-amber-500 rounded-full right-1 -top-1.5 h-[16px] px-[4px] pt-[1px] text-sm  text-center flex items-center justify-center'>
                                {cartData?.CartItem.length}
                            </div>
                        }
                        <FontAwesomeIcon icon={faCartShopping} size='1x' />
                    </li>
                }
            </ul>
        </nav>
    )
}
