import axios from "axios";

const citiesActions = {


    getCities: () => {

        return async (dispatch, getState) => {
            // const res = await axios.get('http://localhost:8000/api/cities')
            const res = await axios.get('https://mytinerary-aybar.herokuapp.com/api/cities')
            dispatch({ type: 'GET_CITIES', payload: res.data.response })
        }
        
    },

    getOneCity: (id) => {

        return async (dispatch, getState) => {
            // const res = await axios.get(`http://localhost:8000/api/cities/${id}`)
            const res = await axios.get(`https://mytinerary-aybar.herokuapp.com/api/cities/${id}`)
            dispatch({ type: 'GET_ONE_CITY', payload: res.data.response })

        }

    },

    filterCities: (cities, value) => {

        return (dispatch, getState) => {
            dispatch({ type: 'FILTER_CITIES', payload: { cities, value } })
        }

    }
}

export default citiesActions;