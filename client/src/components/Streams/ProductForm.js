
import React from 'react';
import { Field, reduxForm } from 'redux-form';

class ProductForm extends React.Component {
	

	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header"> {error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta }) => {
		console.log('meta in ProductForm', meta);
		const className = `field ${ meta.error && meta.touched}? 'error': ''`;

		// return (<input onChange={formProps.input.onChange} value={formProps.input.value}
		// />);  OR

		return (
			<div className={className}>
				<label> { label }</label>
				<input {...input} autoComplete="off" />
				<div>{this.renderError(meta)}</div>
			</div>
		);
		// return <input {formProps.input}/>      or even destructure (take the input property and add them as props to the input element )
	};

	onSubmit = formValues => {
		this.props.onSubmit(formValues);
	};

	render() {
		console.log('general props from ProductForm', this.props);

		return (
			//className form erroe is important, otherwise it wont show up.
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="name" component={this.renderInput} label="Enter Name" />

				<Field name="price" component={this.renderInput} label="Enter price in Euro" />

				<button className="ui button primary">Submit </button>
			</form>
		);
	}
}

const validate = formValues => {
	const errors = {};

	console.log('validate > formValues', formValues);

	if (!formValues.name) {
		errors.name = 'You must enter a name'
	}

	if (!formValues.price) {
		errors.price = 'You must enter a price in Euro';
	}
	return errors;
};

// Redux-form like connect is used in below ways, and we pass object for some configuration.
// connect function will take separate arguments but reduxForm will not, it takes only single object.
// form use garexi, sidhai use vayo hai 

export default reduxForm({
	//name is the purpose of the form
	form: 'ProductForm',
	validate: validate,
})(ProductForm);

// when we pass field, we always need to pass atleast 1 prop i.e name
//name is the property that this filed is going to manage
//Field does not know how to show text input so we need componet
// componenet is either the react component or the functiont for the field to call
