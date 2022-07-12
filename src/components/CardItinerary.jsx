import React, { useState, useEffect } from 'react'
import ButtonCollapsible from './ButtonCollapsible';
import { connect } from 'react-redux';
import activityActions from '../redux/actions/activityActions';
import tineraryActions from '../redux/actions/tineraryActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import toast from 'react-hot-toast';

const CardItinerary = (props) => {

    const [reload, setReload] = useState(false)
    const [tin, setTin] = useState() // guardo mi itinerario

    // console.log(props.likes.length)
    // console.log(props.user)

    useEffect(() => {

        props.getOneTinerary(props.id)
            .then(res => setTin(res.data.response))

        // eslint-disable-next-line
    }, [reload])

    // console.log(tin)

    // funcion que ejecuta el message de likes
    const messaggeLikeDislike = (res) => {

        if (res.data.messagge === 'like 👍') {
            return res.data.messagge
        } else {
            return res.data.messagge
        }

    }

    // funcion que ejecuta el action al tocar el boton like
    const handleLike = async () => {

        const res = await props.likeDislike(props.id);

        toast(`${messaggeLikeDislike(res)}`, { duration: 1000 })
        // toast(`${res.data.messagge}`, { duration: 1000 })

        setReload(!reload)
    }


    return (

        <>
            {/* Card Itinerary */}
            <div className='bg-yellow-400 w-4/5 p-1 rounded-md text-white detail-info grid grid-cols-4 mb-3 container'>

                {/* imagen card */}
                <div className='col-span-1 hidden md:block'
                    style={{
                        backgroundImage: `url('${props.userPhoto}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        width: '150px',
                        height: '150px'
                    }}
                >
                </div>

                {/* conteneido card */}
                <div className='col-span-4 md:col-span-3 flex flex-col justify-between items-center py-4'>

                    {/* titulo y nombre */}
                    <div>
                        <h2 className='font-bold'>{props.tineraryName}</h2>
                        <h3>{props.userName}</h3>
                    </div>

                    {/* hashtags */}
                    <div>
                        <p>{props.hashtags}</p>
                    </div>

                    {/* like price y time */}
                    <div className='flex justify-evenly items-center w-full sm:w-2/3'>

                        <div className='flex items-center justify-center'>
                            {
                                props.user !== null // SI EXISTE EL USUARIO 
                                    ? (
                                        <div onClick={handleLike}>
                                            {
                                                tin?.likes.includes(props.user.id) // EL USUARIO YA LE DIO LIKE ?
                                                    ? <FavoriteIcon style={{ cursor: 'pointer' }} />
                                                    : <FavoriteBorderIcon style={{ cursor: 'pointer' }} />
                                            }
                                        </div>
                                    )
                                    : <FavoriteIcon onClick={() => toast.error('First sign in to click LIKE', { duration: 4500 })}/> // SI NO EXISTE EL USUARIO
                            }
                            <p className='ml-1 text-xl'>{tin?.likes.length}</p> {/* CANTIDAD DE LIKES NUMERO */}
                        </div>

                        <p>{props.price}</p>
                        <p>⏰ {props.time}</p>

                    </div>

                </div>

                {/* botton collaps */}
                <div className='col-span-4 mt-3'>

                    <ButtonCollapsible id={props.id} />

                </div>
            </div>


        </>

    )
}

const mapStateToProps = (state) => {
    return {
        activityFromTinerary: state.activityReducer.activityFromTinerary,
        user: state.usersReducer.user,
    }
}

const mapDispatchToProps = {
    getActivitiesFromItinerary: activityActions.getActivitiesFromItinerary,
    likeDislike: tineraryActions.likeDislike,
    getOneTinerary: tineraryActions.getOneTinerary,
}

export default connect(mapStateToProps, mapDispatchToProps)(CardItinerary)
// export default CardItinerary;