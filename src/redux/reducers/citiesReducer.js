const initialState = { // objeto
    cities: [],
    filterCity: [],
    filter: []
}

const citiesReducer = (state = initialState, action) => { // requiero 2 parametros (estado inicial y action)

    // console.log(action);
    // console.log(state);

    switch (action.type) {

        case 'GET_CITIES':

            return {
                ...state, // toma el estado anterior
                cities: action.payload,
                filter: action.payload
            }

        case 'GET_ONE_CITY':

            return {
                ...state, // toma el estado anterior
                filterCity: action.payload,
            }

        case 'FILTER_CITIES':

            const cityFilter = action.payload.cities.filter(data => data.city.toLowerCase().startsWith( action.payload.value.toLowerCase().trim()) )

            return {
                ...state, // toma el estado anterior
                filter: cityFilter
            }

        default:
            return state
    }

}

export default citiesReducer;