const initialState = {
    tineraries: [],
    filterTinerary: [],
    tinerariesFromCity: [],

}

const tineraryReducer = (state = initialState, action) => {

    //console.log(action);
    // console.log(state);

    switch (action.type) {

        case 'GET_TINERARIES':

            return {
                ...state, // toma el estado anterior
                tineraries: action.payload,
            }
        
        case 'GET_ONE_TINERARY':

            return {
                ...state, // toma el estado anterior
                filterTinerary: action.payload,
                // aux: action.payload
            }

        case 'GET_TINERARIES_FROM_CITY': // traigo todos los itinerarios que coincidan con el id

            return {
                ...state, // toma el estado anterior
                tinerariesFromCity: action.payload,
                // aux: action.payload
            }

        default:
            return state
    }
}
export default tineraryReducer;