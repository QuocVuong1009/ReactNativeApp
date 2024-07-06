const initialState = {
    payload: {
        name: '',
        specific: '',
        response: []
    },
    isLoading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'DELETE_FETCHING':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    name: action.payload.name,
                    specific: action.payload.specific,
                    response: action.payload.response
                },
            };
        case 'DELETE_SHOW_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'DELETE_HIDE_LOADING':
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}
