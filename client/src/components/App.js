import React from 'react';
//React router cares only what is after the domin and port Definition.
import { Router, Route } from 'react-router-dom';
import ProductList from './Streams/ProductList';
import ProductCreate from './Streams/ProductCreate';
import StreamDelete from './Streams/ProductDelete';
import StreamEdit from './Streams/ProductEdit';

import Header from './Header';
import history from '../history'

const App = () => {
	return (
		<div className= 'ui container'>
			{/* creating own history object */}
			<Router history={history}>
				<div>
                <Header/>
					<Route path="/" exact component={ProductList} />
					<Route path="/products/new" exact component={ProductCreate} />
					{/* : is imp */}
					<Route path="/products/edit/:id" exact component={StreamEdit} />
					<Route path="/products/delete/:id" exact component={StreamDelete} />
					 
					 {/* <Route path="/products/show" exact component={StreamShow} /> */}
				</div>
			</Router>
		</div>
	);
};
export default App;
