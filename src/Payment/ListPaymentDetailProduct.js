import React from 'react';
import ProductPaymentDetail from './ProductPaymentDetail';

const ListPaymentDetailProduct = ({product}) => {
	return (
	  	product.map((good,i)=> {
	  		return(
	  		 	<ProductPaymentDetail
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


export default ListPaymentDetailProduct;