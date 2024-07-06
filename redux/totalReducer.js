const initialState = {
    payload : {
        name : '',
        response : []
    },
    isLoading : false,
    hasSearch : false
}

export default (state = initialState, action) => {
        switch(action.type) {
            case 'TOTAL_FETCHING':
                return {
                    ...state,
                    payload : {
                        name : action.payload.name,
                        response : action.payload.response
                    },
                    hasSearch : true
                }
                case 'TOTAL_SHOW_LOADING':
                    return {
                        ...state,
                        isLoading: true,
                        hasSearch: false // Reset khi bắt đầu loading
                    };
                case 'TOTAL_HIDE_LOADING':
                    return {
                        ...state,
                        isLoading: false
                    };
                default:
                    return state;
        }
}