import Lottie from 'react-lottie';
import success from '../assets/animation/success.json';

export default function SuccessAnimation({ width, height, isSuccess }) {

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: success,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <>
            {isSuccess &&
                <div className={`absolute w-full h-full flex justify-center items-center z-20`}>
                    <Lottie
                        options={defaultOptions}
                        speed={2}
                        width={width}
                        height={height}
                    />
                </div>
            }
        </>
    )
}
