import { combineReducers } from 'redux';
//always reducer when calling from 'redux-form, but we make it call formReducer!
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers(
	//form is alway from redux-form always
   {  
      auth: authReducer, 
      form: formReducer, 
      streams: streamReducer }
);
