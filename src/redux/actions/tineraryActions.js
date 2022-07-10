import axios from "axios";

const tineraryActions = {


    getTineraries: () => {

        return async (dispatch, getState) => { // es asincrona porq necesita esperar la respuesta del axios
            // const res = await axios.get('http://localhost:8000/api/tineraries')
            const res = await axios.get('https://mytinerary-aybar.herokuapp.com/api/tineraries')
            dispatch({ type: 'GET_TINERARIES', payload: res.data.response }) // envia el type y el payload(la carga del axios)
        }

    },

    getOneTinerary: (id) => {

        return async (dispatch, getState) => {
            // const res = await axios.get(`http://localhost:8000/api/tinerary/${id}`)
            const res = await axios.get(`https://mytinerary-aybar.herokuapp.com/api/tinerary/${id}`)
            // dispatch({ type: 'GET_ONE_TINERARY', payload: res.data.response })
            return res

        }

    },

    getIinerariesFromOneCity: (id) => {

        return async (dispatch, getState) => {
            // const res = await axios.get(`http://localhost:8000/api/tineraries/${id}`)
            const res = await axios.get(`https://mytinerary-aybar.herokuapp.com/api/tineraries/${id}`)
            dispatch({ type: 'GET_TINERARIES_FROM_CITY', payload: res.data.response })

        }

    },

    likeDislike: (id) => { // recibe el id del itinerario

        const token = localStorage.getItem('token')

        return async (dispatch, getState) => {

            // const res = await axios.put(`http://localhost:8000/api/tineraries/like/${id}`, {}, {

            //     headers: {
            //         'Authorization': 'Bearer ' + token
            //     }
            // })
            const res = await axios.put(`https://mytinerary-aybar.herokuapp.com/api/tineraries/like/${id}`, {}, {

                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            return res
        }
    },

}

export default tineraryActions;