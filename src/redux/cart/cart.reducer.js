const INITIAL_STATE = {
    cart : null
}

const cartReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'SET_CART_ITEM' : 
            return{
                ...state,
                cart : action.payload
            }
        default:
            return state
    }
}

export default cartReducer;