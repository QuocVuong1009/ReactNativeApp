const initialState = {
    payload: {
        keyName: '',
        specific: '',
        editableData: '',
        specificN: ''
    },
    isLoading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_API_FETCHING':
            return {
                ...state,
                payload: {
                    keyName: action.payload.keyName,
                    specific: action.payload.specific,
                    editableData: action.payload.editableData,
                    specificN: action.payload.specificN
                },
                isLoading: true
            };
        case 'SHOW_UPDATE_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'HIDE_UPDATE_LOADING':
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};