import React from 'react';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {deleteComment} from '../Admin/AdminFunction'

const Comment = ({id,customerid,full_name,productid,comment}) => {	

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
					<div>
						<textarea id="txtComment" value={comment} style={{"float":"left","width":"900px"}}></textarea>
						<button type="submit" className="deleteComment" onClick={Delete} style={{"float":"left","margin-top":"10px"}}>
							Delete
						</button>
					</div>
				)
			else
				return(
						<textarea id="txtComment" value={comment} style={{"float":"left","width":"900px","margin-right":"1000px"}}></textarea>
					)
		}
		else
				return(
						<textarea id="txtComment" value={comment} style={{"float":"left","width":"900px","margin-right":"1000px"}}></textarea>
					)
	}

	return(
		<div className="boxContact Comments" id={`${id}`} style={{"margin-bottom": "10px"}}>
			<div className="form-login">
				<div className="inner">
					<div className="line">
						<Link to={"/" + `${customerid}`}><h8>{full_name}</h8></Link>
						{CheckRole()}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Comment;