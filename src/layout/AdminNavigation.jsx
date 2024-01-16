import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

export default function AdminNavigation() {

    const navigate = useNavigate();

    return (
        <nav>
            <ul className='flex gap-2 text-lg font-medium'>
                <li
                    className={`cursor-pointer flex justify-center items-center px-3 py-1 gap-1 hover:ring-white hover:ring-2 hover:rounded-3xl`}
                    onClick={() => {
                        navigate('/')
                    }}>
                    Order
                </li>
                <li
                    className={`cursor-pointer flex justify-center items-center px-3 py-1 gap-1 hover:ring-white hover:ring-2 hover:rounded-3xl`}
                    onClick={() => {
                        navigate('/')
                    }}>
                    Edit
                </li>

            </ul>
        </nav>
    )
}
