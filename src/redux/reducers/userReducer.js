const initialState = {

    user: null,
    welcome: {
        view: false,
        message: '',
        success: false
    }

}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'USER':
            return {
                ...state,
                user: action.payload,
            }
        case 'MESSAGE':
            return {
                ...state,
                welcome: action.payload,
            }
        default:
            return state
    }

}
export default usersReducer;