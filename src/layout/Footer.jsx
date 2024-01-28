import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function Footer() {

    const navigate = useNavigate()

    return (
        <footer
            className="section text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 text-left border-t border-t-1">

            <div className="container py-8 text-center md:text-left">
                <div className="grid-1 grid gap-8 grid-cols-2">
                    <h1
                        className='text-xl font-semibold cursor-pointer text-sky-900'
                        onClick={() => navigate('/')}
                    >
                        Noodels
                    </h1>

                    <div className='flex justify-between'>
                        <div className=''>
                            <h6
                                className="mb-4 flex justify-center font-medium uppercase md:justify-start hove:opacity-60"
                            >
                                Page
                            </h6>
                            <p
                                className="mb-4 text-neutral-600 dark:text-neutral-200 cursor-pointer hover:text-amber-500"
                                onClick={() => navigate('/')}
                            >
                                Product
                            </p>
                            <p
                                className="mb-4 text-neutral-600 dark:text-neutral-200 cursor-pointer hover:text-amber-500"
                                onClick={() => navigate('/contact')}
                            >
                                Contact
                            </p>
                        </div>

                        <div>
                            <h6
                                className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                                Contact
                            </h6>
                            <p className="mb-4 flex items-center justify-center md:justify-start">
                                <FontAwesomeIcon icon={faEnvelope} size='1x' className='mr-3 text-gray-600' />
                                info@example.com
                            </p>
                            <p className="mb-4 flex items-center justify-center md:justify-start">
                                <FontAwesomeIcon icon={faPhone} size='1x' className='mr-3 text-gray-600' />
                                + 01 234 567 88
                            </p>
                        </div>
                    </div>

                </div>

                <div className="pt-4 text-center dark:bg-neutral-700">
                    <span>© 2023 Copyright:</span> Noodels
                </div>
            </div>
        </footer>
    )
}
