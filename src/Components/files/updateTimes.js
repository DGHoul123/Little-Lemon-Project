function updateTimes(state,action){
         switch (action.type) {
        case 'SET_TIMES':
            console.log(`[Reducer] Setting times to:`, action.payload);
            return action.payload;
        case 'UPDATE_TIMES':
            console.log(`[Reducer] Date changed. Clearing old times.`);
            return [];
        default:
            return state;
    }}
    export default updateTimes;