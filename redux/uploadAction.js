export function uploadImageAPI(file, keyName) {
    return {
        type: 'UPLOAD_FETCHING',
        payload: {
            file : file,
            keyName : keyName,
            // response : []
            response : ''
        }
    };
}
