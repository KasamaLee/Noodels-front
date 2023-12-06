import Lottie from 'react-lottie';
import noodle from '../assets/animation/noodle.json';

export default function NoodlesAnimation() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: noodle,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Lottie
            options={defaultOptions}
            width={250}
            height={250}
        />
    )
}
