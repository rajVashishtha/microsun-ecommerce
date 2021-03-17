import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'
// import postReducer from './post images/post.reducer'
import {combineReducers} from 'redux'

export default combineReducers({
    user : userReducer,
    cart: cartReducer
})
