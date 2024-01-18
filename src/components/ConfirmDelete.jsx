import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSquareMinus, faSquarePlus, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function ConfirmDelete({ setIsOpenModal, handleDelete, text = 'Product' }) {
    return (
        <div className='flex flex-col items-center gap-6'>
            <h4 className='text-3xl text-center text-amber-500'>Delete {text} ?</h4>
            <button
                className='text-sm ring-2 ring-black text-black px-3 py-1 bg-gray-300 rounded-3xl flex justify-center items-center gap-1 hover:text-red-500 hover:ring-red-500'
                onClick={() => {
                    handleDelete()
                    setIsOpenModal(false)
                }}
            >
                Delete
                <FontAwesomeIcon icon={faTrash} size='1x' />
            </button>
        </div>
    )
}
