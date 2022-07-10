import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import citiesActions from '../redux/actions/citiesActions';

// Imports Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Grid, Pagination, Autoplay, Navigation } from "swiper";

function Carousel(props) {

    useEffect(() => {

        props.getCities()

        // eslint-disable-next-line
    }, [])

    return (
        <div className="py-10 flex flex-col justify-center items-center contenedor-gallery">

            <h2 className="mb-10 uppercase text-3xl text-yellow-400 font-bold w-full text-center">Popular{' '}<span className='text-white'>MY</span>tineraries</h2>
            <div className="container mx-auto px-10">

                <Swiper
                    slidesPerView={2}
                    grid={{
                        rows: 2,
                    }}
                    slidesPerGroup={2}
                    navigation={true}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: true
                    }}
                    modules={[Grid, Pagination, Autoplay, Navigation]}
                    className="mySwiper"
                >

                    {
                        props.cities?.map(city => (
                            <SwiperSlide
                                style={{
                                    backgroundImage: `url("${city.image}")`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    borderRadius: '10px'
                                }}
                                key={city._id}>

                                <p
                                    style={{
                                        backgroundColor: '#00000076',
                                        width: '100%',
                                        padding: '10px 0',
                                        fontWeight: '600',
                                        color: '#fff'
                                    }}>
                                    {city.city}
                                </p>

                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    getCities: citiesActions.getCities,
}

const mapStateToProps = (state) => { //conectas con los estados
    return {
        cities: state.citiesReducer.cities,
        aux: state.citiesReducer.aux,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
