import React from 'react';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {deleteComment} from '../Admin/AdminFunction'

const Comment = ({id,customerid,productid,comment}) => {	

	const Delete = () => {
	    const Comment = {
	    	id: id
	    }
	    deleteComment(Comment).then(res => {
			alert("DELETE SUCCESS !!!");
			window.location.reload(true);
	    })
	}

	const CheckRole = () => {
		if(localStorage.usertoken!=undefined) {
			const token = localStorage.usertoken;
			const decoded =jwt_decode(token);
			if(decoded.role=="admin")
				return(
					<button type="submit" className="deleteComment" onClick={Delete} style={{"float":"left","margin-top":"10px"}}>
						Delete
					</button>
				)	
		}
	}

	return(
		<div className="boxContact Comments" id={`${id}`} style={{"margin-bottom": "10px"}}>
			<div className="form-login">
				<div className="inner">
					<div className="line">
						<textarea id="txtComment" value={comment} style={{"float":"left"}}></textarea>
						{CheckRole()}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Comment;