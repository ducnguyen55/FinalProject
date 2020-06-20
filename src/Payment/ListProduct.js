import React from 'react';
import ProductPayment from './ProductPayment';

const ListProduct = ({product}) => {
	return (
	  	product.map((good,i)=> {
	  		return(
	  		 	<ProductPayment
	  		 		key={i} 
	  		 		id={good.id}
	  		 		name={good.name} 
	  		 		url={good.url}
	  		 		price={good.price}
	  		 		/>	
		  		);
		  	}
		)
	);
}


export default ListProduct;