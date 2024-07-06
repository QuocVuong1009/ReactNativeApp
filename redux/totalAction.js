export function totalAPI(name) {
    console.log('The name in total is ', name);
    return {
        type: 'TOTAL',
        payload: {
            name : name,
            response: []
        }
    }
}