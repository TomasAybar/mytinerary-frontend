import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions'
import toast from 'react-hot-toast';


export default function GoogleSignUp({ country } ) {

    const dispatch = useDispatch();


    async function handleCallbackResponse(response) { // responso son datos que google tiene de vos

        // console.log(response.credential);

        let userObject = jwt_decode(response.credential); // datos especificos

        // console.log(userObject);

        const res = await dispatch(userActions.signUpUser({

            firstName: userObject.given_name,
            lastName: userObject.family_name,
            email: userObject.email,
            password: userObject.sub,
            photoUrl: userObject.picture,
            country: country,
            from: 'google'

        }))

        res.data.success ?
            toast.success(`${res.data.message}`, { duration: 4500 })
            : toast.error(`${res.data.message}`, { duration: 4500 })       
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '165937703872-ssuvm1p099865ipv8d1e77sdq95c15ao.apps.googleusercontent.com', // VARIABLE DE ENTORNO
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            {
                theme: "outline",
                size: "medium",

            }
        )
    });

    return (
        <div>
            <div
                id='buttonDiv'></div>
        </div>
    )
}