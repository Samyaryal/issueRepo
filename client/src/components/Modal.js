import React from 'react';
//we do it in root file but this being modal we are using here too
//syntax is  return CreatePortal( what do we want to show and, 2nd parameter is where we want to embed, it is usually just below root div)

import ReactDOM from 'react-dom';

const Modal = props => {

	return ReactDOM.createPortal(

		<div onClick={props.ondismiss} className="ui dimmer modals visible active">
			<div onClick={e => e.stopPropagation()} className="ui standard modal visible active">
				<div className="header">{props.name}</div>
				<div className="content"> {props.content}</div>
				<div className="actions">{props.twoButtons}</div>
			</div>
		</div>,
		document.querySelector('#modal')
	);
};
export default Modal;
