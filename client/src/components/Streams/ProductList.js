import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions';
import {Link} from 'react-router-dom'

class ProductList extends React.Component {
	componentDidMount() {
		this.props.fetchProducts();
    }
    
    renderAdmin(stream){
        if (stream.userId ===this.props.currentUserId){
            return (
                <div className= "right floated content">
                 <Link  to ={ `/products/edit/${stream.id}`} className="ui button primary">Edit </Link>

                <Link to = {`/products/delete/${stream.id}`} className= "ui button negative"> Delete</Link>
                </div>
            )
        }
    }

	renderList() {
		return this.props.streams.map(stream => {
			return (
				<div className="item" key={stream.id}>

                    {this.renderAdmin(stream)}

					<i className="large middle aligned icon camera" />

					<div className="content">
						{stream.name}
						<div className="price"> {stream.price}</div>

					</div>
                    
				</div>
			);
		});
    }
    
    renderCreateButtonForSignedInUser ( ){
        if (this.props.isSignedIn){
            return (<div style= {{textAlign:"right"}} > 
                <Link to="/products/new" className="ui button primary">Add A Product</Link>
            </div>)
        }

    }
	render() {
		console.log('from the ProductList', this.props.streams);
		return (
			<div clasName="ui container">
				<h2>YOUR PRODUCTS</h2>
				<div className="ui celled list"> {this.renderList()}</div>

                {this.renderCreateButtonForSignedInUser()}
			</div>
		);
	}
}
const mapStateToProps = state => {
    return { 
        // how Object.values??
        streams: Object.values(state.streams),
       
        currentUserId: state.auth.userId,
        isSignedIn:state.auth.isSignedIn};
};
export default connect(
	mapStateToProps,
	{ fetchProducts }
)(ProductList);
