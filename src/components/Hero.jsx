import React from 'react';
import heroSvg from '../assets/images/hero.svg';
import { Link as BtnLink } from 'react-router-dom';


const Hero = () => {
    return (

        <div className='hero flex items-center justify-center'>

            <div className='svg-1'>
                <img
                    src={heroSvg}
                    alt='decoracion hero' />
            </div>

            <div className='svg-2'>
                <img
                    src={heroSvg}
                    alt='decoracion hero' />
            </div>

            <div className='flex justify-center items-center flex-col px-5'>

                {/* TITULO */}
                <div className='text-white text-center uppercase font-black lg:text-7xl md:text-6xl sm:text-5xl text-4xl mb-4'>
                    <h1>My<span className='text-yellow-400'>Tinerary</span></h1>
                </div>

                {/* SLOGAN */}
                <div className='text-white text-center uppercase font-bold lg:text-3xl md:text-2xl sm:text-2xl text-lg mb-12'>
                    <p>Find your perfect trip, designed by insiders who know and love their cities!!</p>
                </div>

                {/* CTA */}
                <BtnLink
                    to={'/cities'}>

                    <button className='btn-cta'>
                        <span className='span-cta'>Get started</span>
                    </button>

                </BtnLink>

            </div>

        </div>

    );
}

export default Hero;