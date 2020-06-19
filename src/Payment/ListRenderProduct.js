import React from 'react';
import RenderProduct from './RenderProduct';

const ListRenderProduct = ({product}) => {
	return (
	  	product.map((good,i)=> {
	  		return(
	  		 	<RenderProduct
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


export default ListRenderProduct;