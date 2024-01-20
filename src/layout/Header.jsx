import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Modal from '../components/Modal';
import LoginOrRegister from '../features/auth/LoginOrRegister';
import Navigation from './Navigation';
import AdminNavigation from './AdminNavigation';


export default function Header() {

	const { authUser, isOpenLoginModal, setIsOpenLoginModal } = useContext(AuthContext);
	// console.log(authUser)

	const navigate = useNavigate();

	return (
		<header className="section shadow-md z-30 bg-sky-950 fixed py-4 top-0">

			<div className="container flex justify-between items-center text-white">
				<h1
					className='text-xl font-semibold text-white cursor-pointer'
					onClick={() => navigate('/')}
				>
					Noodels
				</h1>

				<div className='flex items-center justify-between gap-4'>
					{authUser?.role === 'ADMIN' ? (
						<AdminNavigation />
					) : (
						<Navigation />
					)}

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
				</div>

				{/* ---- LOGIN MODAL ---- */}
				<Modal zIndex={50} isOpenModal={isOpenLoginModal} onCloseModal={() => setIsOpenLoginModal(false)}>
					<LoginOrRegister onCloseModal={() => setIsOpenLoginModal(false)} />
				</Modal>

			</div>
		</header>
	)
}
