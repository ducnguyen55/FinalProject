import React, {Component} from 'react';
import ListProduct from '../../Product/ListProduct';
import './NewProduct.css';
import axios from '../../AxiosServer'
class SaleProduct extends Component {
	constructor(){
		super();
		this.state={
			product:[],
			saleproduct:[]
		};
	}

	async componentDidMount() {
		await axios.get('/product/get-data')
		.then(response => this.setState({product:response.data}))
	}

	Convert = () => {
		this.state.saleproduct=[];
		this.state.product.map((good,i)=>{
			if(good.discount=="true")
				this.state.saleproduct.push(good);
	})}
	render(){
		{this.Convert()};
		const {saleproduct} = this.state;
		if(!saleproduct.length)
			return <h1>Loading</h1>
		else {
			return (
				<div className="container">
					<h2 className="Title">Sale</h2>
					<ListProduct product={saleproduct} admin={false}/>
				</div>
			);
		}
	}
}

export default SaleProduct;