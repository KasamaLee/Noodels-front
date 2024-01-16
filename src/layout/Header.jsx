import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Modal from '../components/Modal';
import LoginOrRegister from '../features/auth/LoginOrRegister';
import { CartContext } from '../contexts/CartContext';
import { useEffect } from 'react';


export default function Header() {

	const { authUser, isOpenLoginModal, setIsOpenLoginModal } = useContext(AuthContext);
	const { cartData, fetchCart } = useContext(CartContext);
	// console.log(authUser)

	useEffect(() => {
		if (authUser) fetchCart()
	}, [authUser])


	const navigate = useNavigate();

	return (
		<header className="section shadow-md z-50 bg-sky-950 fixed py-4 top-0">

			<div className="container flex justify-between items-center text-white">
				<h1 className='text-xl font-semibold text-white'>Noodels</h1>

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
						<li>
							{authUser ? (
								<Dropdown />
							) : (
								<button
									className={`cursor-pointer flex justify-center items-center px-3 py-1 gap-1 bg-amber-500 rounded-3xl hover:ring-white hover:ring-2`}
									onClick={() => setIsOpenLoginModal(true)}
								>
									Login
								</button>
							)}
						</li>
					</ul>
				</nav>

				{/* ---- LOGIN MODAL ---- */}
				<Modal isOpenModal={isOpenLoginModal} onCloseModal={() => setIsOpenLoginModal(false)}>
					<LoginOrRegister onCloseModal={() => setIsOpenLoginModal(false)} />
				</Modal>

			</div>
		</header>
	)
}
