import Lottie from 'react-lottie';
import contact from '../assets/animation/contact.json';

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
        <Lottie
            options={defaultOptions}
            width={500}
            height={500}
        />
    )
}
