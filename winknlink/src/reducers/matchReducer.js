export function matchReducer(state = null,action){
    switch(action.type){
        case "NEW_MATCH":
            return action.payload;
        default:
            return state;        
    }
}