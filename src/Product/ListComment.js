import React from 'react';
import Comment from './Comment';

const ListComment = ({comments,productid}) => {
	return (
		<div>
			{
				comments.map((comment,i)=> {
					if(comment.productid==productid)
						return(
							<Comment
							key={i} 
							id={comment._id}
							customerid={comment.customerid} 
							productid={comment.productid}
							comment={comment.comment}
							/>	
						);
					}
				)
			}
		</div>
	);
}


export default ListComment;