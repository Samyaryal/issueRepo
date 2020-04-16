import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct, editProduct } from '../../actions';
import StreamForm from './ProductForm'

class ProductEdit extends React.Component {
	componentDidMount() {
		//this.props tala bata aako kura haru
		this.props.fetchProduct(this.props.match.params.id);
    }
    onSubmit =(formValues)=>{
        // going to be used as callback for streamForm
        console.log("values being received in ProductEdit", formValues)

        //below is the action creator and we pass what is needed, the id and the formvalues
        this.props.editProduct(this.props.match.params.id, formValues);

    }
	render() {
		console.log(this.props);
		if (!this.props.stream) {
			return <div> Loading...</div>;
		}
		return (<div>
                <h3> Edit Your Item</h3>
                {/* onSubmit call back */}
                {/* initialValues are special props, get only the things we need  */}
                {/* this.props.stream is an object with title and description property */}
                {/* with lodash {_.pick(this.props.stream, "title", "description")] */}
                <StreamForm  initialValues={{name:this.props.stream.name, price: this.props.stream.price}} onSubmit={this.onSubmit} />

            </div>)
	}
}
const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

// mapstatetoProps, actions creator, Ccomponent
export default connect(
	mapStateToProps,
	{fetchProduct, editProduct }
)(ProductEdit);
