export function detailAPI(name, specific) {
    console.log('The name is ', name);
    console.log('The specific is ', specific);
    return {
        type: 'FETCHING',
        payload: {
            name: name,
            specific: specific,
            response: [],
            image : ''
        }
    }
}

