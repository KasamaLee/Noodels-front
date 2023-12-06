import Lottie from 'react-lottie';
import catLoading from '../assets/animation/catLoading.json';


export default function CatLoader() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: catLoading,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className='w-screen h-screen flex justify-center items-center bg-amber-50'>
            <Lottie
                options={defaultOptions}
                width={400}
                height={400}
            />
        </div>
    )
}
