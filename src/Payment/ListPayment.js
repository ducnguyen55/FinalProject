import React from 'react';
import Product from './ProductPayment';

const ListProduct = ({product}) => {
	return (
	  	product.map((good,i)=> {
	  		return(
	  		 	<Product
	  		 		key={i} 
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