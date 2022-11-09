export function profileReducer(state = null,action){
    switch(action.type){
        case "SHOW":
            return action.payload;
        default:
            return state;        
    }
}