const initialState = {
    payload : {
        file : null,
        ad_name : '',
        result_js : '',
        specific : '',
        response : []
    },
    isLoading : false,
}

export default (state = initialState, action) => {
        switch(action.type) {
            case 'SAVE_FETCHING':
                return {
                    ...state,
                    payload : {
                        file : action.payload.file,
                        ad_name : action.payload.ad_name,
                        result_js : action.payload.result_js,
                        specific : action.payload.specific,
                        response : action.payload.response
                    },
                    isLoading: true
                }
                case 'SAVE_SHOW_LOADING':
                    return {
                        ...state,
                        isLoading: true,
                    };
                case 'SAVE_HIDE_LOADING':
                    return {
                        ...state,
                        isLoading: false
                    };
                default:
                    return state;
        }
}