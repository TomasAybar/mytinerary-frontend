import React from 'react';
import { Link as BtnLInk } from 'react-router-dom';

const Card = (props) => {
    return (

        <BtnLInk
            to={`/cities/city/${props.id}`}
            style={{ backgroundImage: `url('${props.imagen}')` }}
            className='h-60 flex items-center justify-center bg-cover bg-center bg-no-repeat rounded-3xl text-center mb-5 flex-col hover:cursor-pointer hover:border hover:border-yellow-400'
        >

            <p className='text-white font-bold py-3 bg-black bg-opacity-40 w-full'>
                {props.ciudad}
            </p>

        </BtnLInk>
    )
}

export default Card;