import React from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../../actions';
import StreamForm from './ProductForm';

class ProductCreate extends React.Component {
	// we need to pass as the prop named onSubmit
	onSubmit = formValues => {
		this.props.createProduct(formValues);
	};

	render() {
		return (
			<div>
				<h3> Add Your Items in Tori.fi</h3>
				<StreamForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

export default connect(
	null,
	{ createProduct}
)(ProductCreate);
