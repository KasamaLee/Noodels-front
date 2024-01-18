import Lottie from 'react-lottie';
import clickEffect from '../assets/animation/clickEffect.json';

export default function ClickEffect({ width, height, isClick, classPosition }) {

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: clickEffect,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <>
            {isClick &&
                <div className={`absolute z-20 ${classPosition}`}>
                    <Lottie
                        options={defaultOptions}
                        speed={100}
                        width={width}
                        height={height}
                    />
                </div>
            }
        </>
    )
}
