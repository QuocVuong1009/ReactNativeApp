export function updateAPI(keyName, specific, editableData, specificN) {
    const dataString = JSON.stringify(editableData);
    console.log('Key Name:', keyName);
    console.log('Specific:', specific);
    console.log('Editable Data:', dataString);
    console.log('Specific New:', specificN);
    return {
        type: 'UPDATE_FETCHING',
        payload: {
            keyName,
            specific,
            editableData: dataString,
            specificN
        }
    };
}