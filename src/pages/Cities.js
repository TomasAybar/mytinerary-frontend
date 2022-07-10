import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { connect } from 'react-redux';
import citiesActions from '../redux/actions/citiesActions';

const Cities = (props) => {
    // const [input, setInput] = useState('');
    const [search, setSearch] = useState('');

    const searching = (search) => {
        setSearch(search.target.value);
        props.filterCities(props.cities, search.target.value);
    };


    useEffect(() => {

        props.getCities()

        // eslint-disable-next-line
    }, [])

    return (

        // Contenedor principal
        <div
            style={{ backgroundColor: '#3A5BA0' }}
            className='flex flex-grow flex-col items-center'
        >

            {/* contenedor input */}
            <div className='container mx-auto my-10 text-center'>
                <input
                    type='text'
                    placeholder='Search city..'
                    className='p-3 placeholder-gray-400 rounded-md text-center'
                    style={{ width: '60%' }}
                    // onKeyUp={(event) => setInput(event.target.value)} // agarro en mi set lo que escriba en mi input
                    value={search}
                    onChange={searching}
                />
            </div>

            {/* contenedor cards */}
            <div className='container mx-auto px-3 mb-10 w-full sm:w-1/2'>

                {/* card */}

                {
                    props.filter.length !== 0 ?

                        props.filter.map(city => (

                            <Card imagen={city.image} ciudad={city.city} id={city._id} key={city._id} />

                        ))

                        :

                        <p className='text-center text-xl text-yellow-400 uppercase'>No search results</p>

                }

            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        cities: state.citiesReducer.cities, // accedo a todas las ciudades
        filter: state.citiesReducer.filter // accedo a las ciudades mediante el filtro
    }
}

const mapDispatchToProps = {
    getCities: citiesActions.getCities, // traigo ciudades
    filterCities: citiesActions.filterCities // traigo el filtro
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities);