import Lottie from 'react-lottie';
import contact from '../assets/animation/contact.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function Contact() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: contact,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <>
            <div className='container py-14 flex items-center gap-12'>
                <div>
                    <Lottie
                        options={defaultOptions}
                        width={500}
                        height={500}
                    />
                </div>

                <div className='flex flex-col gap-6 grow'>
                    <h6 className="mb-4 text-4xl flex justify-center font-semibold uppercase md:justify-start">
                        Contact
                    </h6>
                    <p className="text-xl flex items-center justify-center md:justify-start">
                        <FontAwesomeIcon icon={faEnvelope} size='1x' className='mr-3 text-gray-600' />
                        info@example.com
                    </p>
                    <p className="text-xl flex items-center justify-center md:justify-start">
                        <FontAwesomeIcon icon={faPhone} size='1x' className='mr-3 text-gray-600' />
                        + 01 234 567 88
                    </p>
                </div>
            </div>
        </>
    )
}
