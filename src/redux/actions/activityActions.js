import axios from "axios";

const activityActions = {

    getActivities: () => {

        return async (dispatch, getState) => { // Esperar la respuesta del axios
            // const res = await axios.get('http://localhost:8000/api/activities')
            const res = await axios.get('https://mytinerary-aybar.herokuapp.com/api/activities')
            // console.log(res)
            dispatch({ type: 'GET_ACTIVITIES', payload: res.data.response }) // envia el type y el payload(la carga del axios)
        }

    },

    getActivitiesFromItinerary: (id) => {

        return async (dispatch, getState) => {

           
                // const res = await axios.get(`http://localhost:8000/api/tinerariesActivities/${id}`)
            const res = await axios.get(`https://mytinerary-aybar.herokuapp.com/api/tinerariesActivities/${id}`)
                // console.log(res)
                // dispatch({ type: 'GET_ACTIVITIES_FROM_TINERARY', payload: res.data.response })
                return res;

        }

    },
}

export default activityActions;
