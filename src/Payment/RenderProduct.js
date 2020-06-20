import React from 'react';
import {Link} from 'react-router-dom';

const format_currency = (price) => {
	return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

const RenderProduct = ({id,url,name,price}) => {	
	return(
		<div class="infoCart clearFix">
		    <a href={`${url}`} class="thumbProduct">
		        <img src={`${url}`} alt="ÁO DÂY NỮ ĐẸP AD20-001"/>
		    </a>
		    <p>Price: <span>{format_currency(price)}</span></p>
		    <p class="count">Number: <span>1</span></p>
		</div>	
		)
}

export default RenderProduct;