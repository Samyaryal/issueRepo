import streams from '../apis/streams';
import history from '../history';
import { SIGN_IN, SIGN_OUT,  EDIT_PRODUCT, DELETE_PRODUCT, CREATE_PRODUCT, FETCH_PRODUCTS, FETCH_PRODUCT } from './types';
import { actionTypes } from 'redux-form';

export const signIn = userId => {
	return {
		type: SIGN_IN,
		payload: userId,
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT,
	};
};

export const createProduct = formValues => async (dispatch, getState) => {
	const { userId } = getState().auth;

	// latter part is going to be added, here formvalues and userId
	const response = await fetch.post('/products', { ...formValues, userId });

	// After we get the action, we are going to dispatch an action with type and payload

	dispatch({
		//why data? upon response from axios, respose object has ton of info about response but we only care about the stuff
		//made inside the request.

		type: CREATE_PRODUCT,
		payload: response.data,
	});

    // what do we do after going there?? redirect, this is called programmatic navigation
	history.push('/');
};

export const fetchProducts = () => async dispatch => {
	const response = await streams.get('/products');
	console.log("fetched response", response)

	dispatch({
		type: FETCH_PRODUCTS,
		payload: response.data,
	});
	
};

export const fetchProduct = id => async dispatch => {
	const response = await fetch.get(`/products/${id}`);

	dispatch({
		type: FETCH_PRODUCT,
		payload: response.data,
	});
};

// update ko lagi chai we need to pass in the parameter which we are going and also the thing we need to put in there

export const editProduct = (id, formValues) => async dispatch => {

    // patch vs put; put for wholoshale, patch for only few
	const response = await fetch.patch(`/products/${id}`, formValues);

	dispatch({
		type: EDIT_PRODUCT,
		payload: response.data,
    });
    history.push('/')
};

export const deleteProduct = id => async dispatch => {
	// const response = empty
	await fetch.delete(`/product/${id}`);

	dispatch({
		type: DELETE_PRODUCT,
		//only here is the id 
		payload: id,
	});
	history.push('/');
};


// Post Request with axios

// this is going to be called with list of all the values we listed in out form as an argument
//Everytime we are going to make async. action createor, we need to use Redux-thunk
// So steps:
// ARROW function from action creator=> first argument is dispatch function
// inner function will have to call async await o
// export const createStream = formValues => {
// 	return dispatch => {};
// };

// we need to put all the form values there