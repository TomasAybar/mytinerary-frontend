import React, { useEffect } from 'react';
import { Link as BtnLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import citiesActions from '../redux/actions/citiesActions';
import tineraryActions from '../redux/actions/tineraryActions';
import activityActions from '../redux/actions/activityActions';
import CardItinerary from '../components/CardItinerary';


const Detail = (props) => {

    const { id } = useParams();
    // const [reload, setReload] = useState(false)
   
    useEffect(() => {

 
        props.getOneCity(id) //action
        props.getIinerariesFromOneCity(id) //action
        props.getActivities() // action

        // eslint-disable-next-line
    }, [])

    const tineraries = props.tinerariesFromCity;

    // tineraries.forEach(tin => console.log(tin.comments))

    // console.log(tineraries)

    return (

        // Contenedor principal
        <div className='flex flex-grow justify-center items-center text-center sm:p-5 flex-col'
            style={{ backgroundColor: '#3A5BA0' }}
        >
            {/* contenedor */}
            <div className='mx-3 mb-12 container flex flex-col items-center justify-center'>

                {/* boton volver atras */}
                <BtnLink
                    to={'/cities'}
                    className='btn-cta mb-2'
                    
                >
                    <span className='span-cta text-3xl'>⬅</span>
                </BtnLink>

                {/* contenedor card */}
                <div
                    style={{ backgroundColor: '#1f4690' }}
                    className='container w-full sm:w-4/5 flex flex-col items-center justify-center rounded-md py-10 mt-10'
                >
                    <div className='w-full flex justify-center items-center flex-col mb-5'>
                        <p className='bg-yellow-400 w-4/5 mb-2 p-1 md:p-2 rounded-md text-white md:font-bold text-base md:text-lg detail-info'>{props.filterCity.continent}</p>
                        <p className='bg-yellow-400 w-4/5 mb-2 p-1 md:p-2 rounded-md text-white md:font-bold text-base md:text-lg detail-info'>{props.filterCity.city}, {props.filterCity.country}</p>
                    </div>

                    <img
                        src={props.filterCity.image}
                        className='w-4/5 rounded-md mb-5'
                        alt='city'
                    />

                    {/* MAPEO DE ITINERARIOS */}
                    {
                        tineraries?.length !== 0 ?

                            tineraries?.map((tinerary, index) => (

                                <CardItinerary
                                    key={index}
                                    userPhoto={tinerary.userPhoto}
                                    tineraryName={tinerary.tineraryName}
                                    userName={tinerary.userName}
                                    likes={tinerary.likes}
                                    price={tinerary.price}
                                    time={tinerary.time}
                                    hashtags={tinerary.hashtags}
                                    id={tinerary._id}
                                />
                            ))

                            :

                            <p className='text-center text-xl text-yellow-400 uppercase'>no tineraries yet</p>
                    }
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        filterCity: state.citiesReducer.filterCity, // accedo a la ciudad
        tinerariesFromCity: state.tineraryReducer.tinerariesFromCity, // accedo a los itinerarios respecto al id
        // activityFromTinerary: state.activityReducer.activityFromTinerary, // accedo a las actividades respecto al id

    }
}

const mapDispatchToProps = {
    getOneCity: citiesActions.getOneCity,
    getIinerariesFromOneCity: tineraryActions.getIinerariesFromOneCity, // traigo todos los itinerarios que coincidan con mi id
    getActivitiesFromItinerary: activityActions.getActivitiesFromItinerary, // traigo todos los itinerarios que coincidan con mi id
    getActivities: activityActions.getActivities, // traigo todos las actividades
    likeDislike: tineraryActions.likeDislike, 
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
