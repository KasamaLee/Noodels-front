import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

export default function CartFooter() {

    const navigate = useNavigate()
    const {selectedCartItemTotalPrice, setSelectedCartItemTotalPrice} = useContext(CartContext)

    return (
        <div className='section fixed z-20 bottom-0 left-0 right-0 bg-white border-t-4 border-t-amber-500 py-5'>
            <div className='container flex justify-between items-center'>
                <h4 className='text-3xl text-center text-amber-500'>Total Price : { }</h4>
                <button
                    className='w-44 ring-4 ring-black text-black px-4 py-2 bg-amber-400 rounded-full text-xl font-semibold flex justify-center items-center gap-2 hover:gap-4'
                    onClick={() => navigate('/payment')}
                >
                    Place order
                    <FontAwesomeIcon icon={faChevronRight} size='1x' />
                </button>
            </div>

        </div>
    )
}
