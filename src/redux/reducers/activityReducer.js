const initialState = {
    activities: [],
    activityFromTinerary: [],
}

const activityReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case 'GET_ACTIVITIES':

            return {
                ...state,
                activities: action.payload,
            };

        case 'GET_ACTIVITIES_FROM_TINERARY':

            return {
                ...state,
                activityFromTinerary: action.payload,
            };

        default:
            return state
    }

}

export default activityReducer;