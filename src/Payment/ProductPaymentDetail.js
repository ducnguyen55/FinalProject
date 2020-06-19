import React from 'react';
import {Link} from 'react-router-dom';
const format_currency = (price) => {
	return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

const ProductPaymentDetail = ({id,url,name,price}) => {	
	const Delete = () => {
		var productincart = JSON.parse(sessionStorage.getItem("cart"));
		for ( var i = 0 ; i < productincart.length; i++)
			if( id == productincart[i].id )
				productincart.splice(i,1);
		sessionStorage.setItem("cart",JSON.stringify(productincart));
	}
	return(
		<div className="item clearFix">
			<div className="col col01">
				<img alt='imageproduct' src={`${url}`} id="image" />
	        </div>
			<div className="col col02">
	            <h4>{name}</h4>
			</div>
			<div class="col col03">
				<h4>Giá</h4>
				<p>
	    			<strong>{format_currency(price)}</strong>
				</p>
			</div>
			<div class="col col04">
				<h4>Số lượng</h4>
	                <h10 className="text-center mx">1</h10>
	        </div>
		</div>
	)
}

export default ProductPaymentDetail;