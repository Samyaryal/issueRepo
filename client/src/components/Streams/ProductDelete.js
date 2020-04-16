import React from 'react';
import Modal from '../Modal';
import {Link } from 'react-router-dom'

import {connect} from 'react-redux'
import history from '../../history'
import {fetchProduct, deleteProduct} from '../../actions';

class ProductDelete extends React.Component {
    componentDidMount(){
        //from the below console we can find the id of stream which we want to delete
        console.log('initially props are coming from react-router-dom',this.props);

        //lets call the action creator (fetchProduct) to delete with this id
        //bolayera kutnee jsto 6, tsko lagi paila bolaunee jsto  6 component did mount!!

        this.props.fetchProduct(this.props.match.params.id)
    }
    renderActions(){
	    return (
        // below could be div or ReactFragment but fragment wont have impact on DOM. <> </>
		<React.Fragment>
            
            {/* aba chai kutnee ho, but callback jsto garna parxa hai */}
            {/* tyo vanako ni API  ma nai delete garnee ho so, balla deleteProduct action creator use garna parxa */}

			<button onClick={()=>this.props.deleteProduct(this.props.match.params.id)} className="ui button negative">Delete </button>
			<Link to= "/" className="ui button">Cancel </Link>
		</React.Fragment>
    );
    }
    renderContent(){
        if (!this.props.stream){
            return 'Are You sure that you want to delete this stream?'
        }
        return `Are you sure you want to delete the stream with name: ${this.props.stream.name}`
    }
    render(){ 
        return (
        <Modal 
            title="delete Stream"
            content={this.renderContent()} 
            twoButtons= {this.renderActions()} 
            ondismiss={()=>history.push('/')} 
        />);
    }
}
//ownProps  chai redux ko vanda ni arko bahira component here ProdductDelete ma aayako props suru ma from react-router-dom

//Redux Store ko lagi arko pipe jsto ( from the component props)
// 
// prop should have stream property that contains the stream that our user is trying to delete

// Down Code Explanation:
//const streams= {id:3, title:"i created"}
//streams["title"]
// "i created"
// stream.title
// "i created"
const mapStateToProps =(state, ownProps)=>{
    
    //state is object; tyo vanako luga ksto lagayo vanne hunxa
    // Purai object ksto 6 vanera pailee nai taha 6, so just match garako ho
    //school ko all section  ma, Monitor ko ho vanda,  7A ko ho vanee jsto ho paxadi ko!! Monitor pailee nai taha thio ni, Redux ma .
    return {stream: state.streams[ownProps.match.params.id]}

}
export default  connect(mapStateToProps, {fetchProduct, deleteProduct})(ProductDelete);
