import React from 'react';
import connectSvg from '../assets/images/connect.svg';

const Connect = () => {

    return (

        <div className='connect'>

            <div className='flex justify-center items-center container mx-auto h-full'>

                <div className='h-3/4 hidden md:block w-2/3'>
                    <img
                        src={connectSvg}
                        alt="travel"
                        className='h-full' />
                </div>

                <div className='flex justify-center items-center md:w-1/3 text-center'>
                    <p
                        className='text-3xl md:text-4xl lg:text-5xl uppercase w-full font-bold text-cyan-800'>
                        <span
                            className='text-yellow-500'>To travel is to live
                        </span>{' '}you dont't need magic to disappear. All you need is a destination.
                    </p>
                </div>
            </div>
        </div>

    );
}

export default Connect;