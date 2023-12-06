import React from 'react'
import Lottie from 'react-lottie';
import animationShiba from '../assets/animation/shiba.json';
import ProductList from '../features/product/ProductList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CategoryList from '../features/category/CategoryList';

export default function HomePage() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationShiba,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };


    return (
        <>
            <section className='section bg-amber-100 pt-16'>
                <div className='container flex justify-between py-8'>
                    <div className='w-full flex flex-col justify-center items-start gap-4'>
                        <h3 className='w-full text-3xl font-bold text-gray-500 text-5xl'>Life is better with </h3>
                        <h3 className='w-full text-3xl font-bold text-black text-5xl'>Noodles</h3>
                        <button
                            className='mt-4 w-40 ring-4 ring-black text-black px-6 py-2 bg-amber-400 rounded-3xl text-2xl font-semibold flex justify-center items-center gap-2 hover:gap-4'>
                            Explore
                            <FontAwesomeIcon icon={faChevronRight} size='sm' />
                        </button>
                    </div>

                    <div className='-mb-10'>
                        <Lottie
                            options={defaultOptions}
                            width={350}
                        />
                    </div>
                </div>
            </section>

            <section>
                <div className='py-10 container flex justify-center gap-4'>
                    <CategoryList />
                </div>
            </section>

            <section className='section'>
                <div className='container py-10'>
                    <ProductList />
                </div>
            </section>
        </>
    )
}
