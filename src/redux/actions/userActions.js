import axios from "axios";
// import { dispatch } from "react-hot-toast/dist/core/store";

const userActions = {


    signUpUser: (data) => {

        return async (dispatch, getState) => {

            try {

                // const res = await axios.post('http://localhost:8000/api/signup', data);
                const res = await axios.post('https://mytinerary-backend-aybar.herokuapp.com/api/signup', data);
                // console.log(res)

                dispatch({
                    type: 'MESSAGE',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                });

                return res;
            } catch (error) { console.log(error) }

        }
    },

    signInUser: (data) => {

        return async (dispatch, getState) => {

            try {

                // const res = await axios.post('http://localhost:8000/api/signin', data)
                const res = await axios.post('https://mytinerary-backend-aybar.herokuapp.com/api/signin', data)

                // console.log(res)

                if (res.data.success) { // para no generar algun tonken al pepe

                    localStorage.setItem('token', res.data.response.token) // seteo en el ls mi token creado en el contorlador

                    dispatch({
                        type: 'USER',
                        payload: res.data.response.userData
                    });

                }

                return res;

            } catch (error) { console.log(error) }

        }
    },

    signOutUser: (data) => {

        return async (dispatch, getState) => {

            // const res = axios.post('http://localhost:8000/api/signout', data)
            // console.log(res)
            localStorage.removeItem('token');

            dispatch({
                type: 'USER',
                payload: null
            })

        }
    },

    verifyToken: (token) => {

        return async (dispatch, getState) => {

            // console.log(token)

            // const res = await axios.get('http://localhost:8000/api/signinToken', {

            //     headers: {
            //         'Authorization': 'Bearer ' + token
            //     }

            // })
            const res = await axios.get('https://mytinerary-backend-aybar.herokuapp.com/api/signinToken', {

                headers: {
                    'Authorization': 'Bearer ' + token
                }

            })

            // console.log(res)

            if (res.data.success) {

                dispatch({ 
                    type: 'USER', 
                    payload: res.data.response 
                });

                // dispatch({
                //     type: 'MESSAGE',
                //     payload: {
                //         view: true,
                //         message: res.data.message,
                //         success: res.data.success
                //     }
                // });

            } else {
                localStorage.removeItem('token')
            }

        }
    }

}

export default userActions;