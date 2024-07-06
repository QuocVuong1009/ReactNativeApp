export function saveAPI(file, ad_name, result_js, specific) {
    return {
        type: 'SAVE',
        payload: {
            file : file,
            ad_name : ad_name,
            result_js : result_js,
            specific : specific,
            response : []
        }
    }
}