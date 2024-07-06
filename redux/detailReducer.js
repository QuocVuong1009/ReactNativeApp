const initialState = {
    payload: {
        name: '',
        specific: '',
        response: [],
        image: ''
    },
    isLoading: false,
    hasSearched: false // Thêm trường này
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'API_FETCHING':
            return {
                ...state,
                payload: {
                    ...state.payload,
                    name: action.payload.name,
                    specific: action.payload.specific,
                    response: action.payload.response,
                    image: action.payload.image,
                },
                hasSearched: true // Cập nhật khi API call hoàn tất
            };
        case 'SHOW_LOADING':
            return {
                ...state,
                isLoading: true,
                hasSearched: false // Reset khi bắt đầu loading
            };
        case 'HIDE_LOADING':
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}
