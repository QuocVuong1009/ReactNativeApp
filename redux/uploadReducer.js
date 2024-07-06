const initialState = {
    payload: {
        file: null,
        keyName: '',
        // response: []
        response: ''
    },
    isLoading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPLOAD_IMAGE_FETCHING':
            return {
                ...state,
                payload: {
                    file: action.payload.file,
                    keyName: action.payload.keyName,
                    response: action.payload.response
                },
                isLoading: true
            };
        case 'SHOW_UPLOAD_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'HIDE_UPLOAD_LOADING':
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};
