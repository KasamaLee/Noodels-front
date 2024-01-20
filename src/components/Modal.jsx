import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function Modal({ children, isOpenModal, onCloseModal, zIndex = 40 }) {

    return (
        <>
            {isOpenModal && (
                <>
                    <div className={`${zIndex} fixed top-0 bottom-0 right-0 left-0 backdrop-blur-sm flex justify-center items-center`}>
                        <div className="bg-white ring-4 ring-gray-500 rounded-2xl p-14 pt-20 flex flex-col gap-10 relative justify-center">
                            <div
                                className="absolute top-6 right-8 text-gray-500 cursor-pointer"
                                onClick={onCloseModal}
                            >
                                <FontAwesomeIcon icon={faCircleXmark} size='2x' className='hover:text-amber-500 focus:text-amber-500' />
                            </div>
                            <div onClick={e => e.stopPropagation()}>
                                {children}
                            </div>
                        </div>
                    </div>
                </>

            )}
        </>
    )
}
