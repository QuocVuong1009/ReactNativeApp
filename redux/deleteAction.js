export function deleteAPI(name, specific) {
    console.log('The name in delete action is ', name);
    console.log('The specific in delete action is ', specific);
    return {
        type: 'DELETE',
        payload: {
            name: name,
            specific: specific,
            response: []
        }
    }
}

