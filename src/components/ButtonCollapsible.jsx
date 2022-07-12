import React from 'react'
import { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import { connect } from 'react-redux';
import activityActions from '../redux/actions/activityActions';
import tineraryActions from '../redux/actions/tineraryActions';
import commentActions from '../redux/actions/commentActions'
// import avatar from '../assets/images/avatar.png';
import AddCommentIcon from '@mui/icons-material/AddComment';
import toast from 'react-hot-toast';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';


const ButtonCollapsible = (props) => {

    const [tin, setTin] = useState() // guardo mi itinerario
    const [activities, setActivities] = useState([]); // guardo mis actividades
    const [inputComment, setInputComment] = useState(''); // guardo el valor de mi input de agregar
    const [inputCommentEdit, setInputCommentEdit] = useState(''); // Guardo el valor de mi input de edit
    const [commentID, setCommentID] = useState(); // guardo el id del comentario que se esta editando
    const [reload, setReload] = useState(false); // recarga la pagina


    // MODAL
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    useEffect(() => {

        // console.log(props.id) // ID DE MI ITINERARIO

        props.getOneTinerary(props.id)
            .then(res => {
                // console.log(res)
                setTin(res.data.response)
            })

        props.getActivitiesFromItinerary(props.id)
            .then(res => {
                // console.log(res)
                setActivities(res.data.response)
            })


        // eslint-disable-next-line
    }, [reload, props.id]) // se renderiza cada vez que detecta un id nuevo o cuando se ejecuta el reload

    // agrega un comentario nuevo
    const addComment = async () => {

        if (inputComment.value.length < 5) {

            toast.error('The comment must have more than five letters', { duration: 3000 })

        } else {

            const data = {
                tineraryID: props.id,
                comment: inputComment.value
            }

            const res = await props.addComment(data)

            if (res.data.success) {

                toast.success(`${res.data.messagge}`, { duration: 3000 })

            } else {

                toast.error(`${res.data.messagge}`, { duration: 3000 })

            }

            inputComment.value = '';
            // setInputComment('')
            setReload(!reload)
        }

    }

    // setea el id del comentario en un hook (BOTON EDIT)
    const exeEdit = (idComment) => {

        setCommentID(idComment)
        // console.log(idComment)
        onOpenModal()

    }

    // se ejecuta en el BOTON MODIFY del modal
    const editComment = async () => {

        if (inputCommentEdit.length < 5) {

            toast.error('short comment', { duration: 3000 })

        } else {

            const data = {
                commentID: commentID,
                comment: inputCommentEdit
            }

            const res = await props.modifyComment(data);

            if (res.data.success) {

                toast.success(`${res.data.messagge}`, { duration: 3000 })

            } else {

                toast.error(`${res.data.messagge}`, { duration: 3000 })

            }

            setInputCommentEdit('')
            onCloseModal()
            setReload(!reload)
        }

    }

    // se ejecuta en el boton REMOVE
    const removeComment = async (e) => {

        // console.log(e.target.id) // ID DE MI ITINERARIO

        const res = await props.removeComment(e.target.id)

        if (res.data.success) {

            toast.success(`${res.data.messagge}`, { duration: 3000 })
        }
        else {

            toast.error(`${res.data.messagge}`, { duration: 3000 })

        }
        setReload(!reload)
    }


    return (

        <>
            <Collapsible trigger='⬇'>

                {/* CAJA DE ACTIVIDADES */}
                <div className='flex flex-col lg:flex-row justify-evenly items-center w-full gap-2'>

                    {
                        activities.length > 0
                            ? activities?.map((activity, index) => {
                                return (
                                    <div
                                        className='w-full'
                                        key={index}
                                    >
                                        <figure
                                            style={{
                                                backgroundImage: `url('${activity?.image}`,
                                                height: '250px',
                                            }}
                                            className='rounded-md bg-cover bg-no-repeat bg-center mb-2'
                                        />
                                        {/* <img
                                            src={activity?.image}
                                            className='w-full'
                                            style={{ height: '250px' }}
                                            alt={activity.name}
                                        /> */}
                                        <p className='text-center text-white uppercase mb-8'>{activity.name}</p>
                                    </div>
                                )
                            })
                            : <p className='text-center text-xl text-white uppercase mb-8'>No activities yet</p>
                    }
                </div>

                {/* CONTENEDOR CAJA DE COMENTARIOS */}
                <div className='p-2'>

                    {/* CONTENEDOR COMENTARIO */}
                    <div>

                        {
                            tin?.comments.map((element, index) => {

                                return (
                                    <div className='mb-12' key={index}>

                                        <div className='bg-blue-700 lg:w-4/5 mx-auto py-4 md:p-2 rounded-md text-white detail-info grid grid-cols-4 mb-3 container'>

                                            {/* IMAGEN DE USUARIO */}
                                            {/* <div
                                                className='col-span-1 hidden md:block rounded-md'
                                                style={{
                                                    backgroundImage: `url('${element.userID.photoUrl}')`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'no-repeat',
                                                    width: '100px',
                                                    height: '100px'
                                                }}
                                            /> */}
                                            <div
                                                className='col-span-1 hidden md:block rounded-md'
                                                style={{
                                                    width: '100px',
                                                    height: '100px'
                                                }}
                                            >
                                                <img
                                                    onClick={(e) => console.log(e.target)}
                                                    style={{
                                                        maxWidth: '100%',
                                                        minHeight: '100%'
                                                    }}
                                                    src={element.userID.photoUrl}
                                                    alt={element.userID.firstName}
                                                />
                                            </div>

                                            {/* NOMBRE Y COMENTARIO DEL USUARIO */}
                                            <div
                                                className='col-span-4 md:col-span-3 flex flex-col items-center justify-evenly'
                                            >
                                                <p className='uppercase text-yellow-400 font-bold'>{element.userID.firstName} {element.userID.lastName}</p>
                                                <p
                                                    className='px-2'
                                                    style={{
                                                        overflowY: 'scroll',
                                                        maxHeight: '75px',
                                                    }}
                                                >{element.comment}</p>
                                            </div>

                                        </div>

                                        {/* BOTONES */}
                                        {

                                            props.user !== null

                                            && (

                                                element.userID._id === props.user.id
                                                && (
                                                    <div className='flex items-center justify-center gap-3'>
                                                        <button
                                                            id={element._id}
                                                            onClick={removeComment}
                                                            className='p-2 font-bold bg-red-400 hover:bg-red-500 rounded-md shadow'
                                                            style={{ width: '6rem' }}
                                                        >Delete</button>

                                                        <button
                                                            onClick={() => { exeEdit(element._id) }}
                                                            className='p-2 font-bold bg-green-400 hover:bg-green-500 rounded-md shadow'
                                                            style={{ width: '6rem' }}
                                                        >Edit</button>
                                                    </div>
                                                )
                                            )

                                        }

                                    </div>
                                )

                            })
                        }

                    </div>

                    {/* CONTENEDOR DE INPUT */}

                    {
                        props.user
                            ? (
                                <div className='container mx-auto flex justify-center items-center mt-5'>

                                    <input
                                        type='text'
                                        className='w-3/4 p-2 rounded-md shadow text-black'
                                        placeholder='Write your comment..'
                                        onKeyUp={(e) => setInputComment(e.target)}
                                    />

                                    <AddCommentIcon
                                        onClick={addComment}
                                        id={props.id}
                                        style={{ cursor: 'pointer', marginLeft: '5px', fontSize: '40px' }}
                                        className='hover:text-green-300'
                                    />

                                </div>
                            )
                            : (
                                <div className='container mx-auto flex justify-center items-center mt-5'>

                                    <input
                                        type='text'
                                        className='w-3/4 p-2 rounded-md shadow text-black'
                                        placeholder='First sign in to comment..'
                                        disabled
                                    />

                                    <AddCommentIcon
                                        onClick={() => toast.error('First sign in to comment..', { duration: 4500 })}
                                        disabled
                                        style={{ marginLeft: '5px', fontSize: '40px' }}
                                    />

                                </div>
                            )
                    }

                </div>

                <Modal open={open} onClose={onCloseModal} center>
                    <input
                        type='text'
                        className='text-black rounded-md shadow-md p-4 w-full mx-auto mt-8 text-center'
                        placeholder='new comment..'
                        onKeyUp={(e) => setInputCommentEdit(e.target.value)}
                    />
                    <div className='flex justify-center items-center gap-4'>

                        <button
                            className='mt-4 p-3 px-7 bg-green-400 hover:bg-green-500 rounded-md shadow text-white'
                            onClick={editComment}
                        >
                            Modify
                        </button>
                    </div>
                </Modal>

            </Collapsible>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        activityFromTinerary: state.activityReducer.activityFromTinerary,
        user: state.usersReducer.user,
        filterTinerary: state.tineraryReducer.filterTinerary
    }
}

const mapDispatchToProps = {
    getActivitiesFromItinerary: activityActions.getActivitiesFromItinerary,
    getOneTinerary: tineraryActions.getOneTinerary,
    addComment: commentActions.addComment,
    removeComment: commentActions.removeComment,
    modifyComment: commentActions.modifyComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonCollapsible)
// export default ButtonCollapsible;