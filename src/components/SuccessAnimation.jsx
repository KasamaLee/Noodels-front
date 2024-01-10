import Lottie from 'react-lottie';
import success from '../assets/animation/success.json';

export default function SuccessAnimation() {

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: success,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className='absolute w-full h-full flex justify-center items-center'>
            <Lottie
                options={defaultOptions}
                speed={2}
                width={380}
                height={380}
            />
        </div>
    )
}
