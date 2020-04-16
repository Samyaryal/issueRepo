import _ from 'lodash';
import { FETCH_PRODUCT, FETCH_PRODUCTS, CREATE_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT } from '../actions/types';


export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_PRODUCTS:
		console.log( "action payload", action.payload)
		console.log("reducer", {...state, ..._.mapKeys(action.payload, "_id")})
			 return { ...state, ..._.mapKeys(action.payload, '_id') };
		case FETCH_PRODUCT:
			return { ...state, [action.payload.id]: action.payload };
		case CREATE_PRODUCT:
			return { ...state, [action.payload.id]: action.payload };
		case EDIT_PRODUCT:
			return { ...state, [action.payload.id]: action.payload };

		case DELETE_PRODUCT:
			return _.omit(state, action.payload);
		default:
			return state;
	}
};

// Array-based approach
// export default( state= [ ], action )=>{
// 	switch (action.type){
// 		case EDIT_PRODUCT:
// 		return state.map(product =>{
// 			if (product.id === action.payload.id){
// 				return action.payload;
// 			}else{
// 				return product
// 			}
// 		});

// 		case DELETE_PRODUCT:
// 		return state.map(product =>{
// 			if (product)
// 		})
// 		default:
// 		return state;
// 	}
// }

//  Removing => state.filter(element =>element !=="hi")
// Addding => [...state, "hi"]
// Replacing => state.map(el=>el==="hi" ? 'bye' :el)


