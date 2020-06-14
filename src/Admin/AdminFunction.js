import axios from '../AxiosServer'

export const addProduct = newProduct => {
	return fetch('https://apiserverfinal.herokuapp.com/product/insert',{
			method: 'POST',
			headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                api_key: localStorage.usertoken
            },
            body:JSON.stringify({
				id: newProduct.id,
				type: newProduct.type,
				name: newProduct.name,
				url: newProduct.url,
				price: newProduct.price,
				token: localStorage.usertoken	
			})
		})
		.then(res => {
			console.log('Add product success!')
		})
}

export const updateProduct = Product => {
	return 	fetch('https://apiserverfinal.herokuapp.com/product/update',{
			method: 'PATCH',
			headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                api_key: localStorage.usertoken
            },
            body:JSON.stringify({
				id: Product.id,
				name: Product.name,
				price: Product.price
            })
		})
		.then(res => {
			console.log('Update product success!')
		}
	)
}

export const deleteProduct = Product => {
	return axios(`https://apiserverfinal.herokuapp.com/product/${Product.id}`,{
			method: 'DELETE',
						headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                api_key: localStorage.usertoken
            }
		})
		.then(res => {
			console.log('Deleted product!')
		}
	)
}
