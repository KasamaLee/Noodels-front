import Lottie from 'react-lottie';
import catNotFound from '../assets/animation/catNotFound.json';

export default function CatNotFound() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: catNotFound,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
            <Lottie
                options={defaultOptions}
                width={220}
                height={220}
            />
    )
}
