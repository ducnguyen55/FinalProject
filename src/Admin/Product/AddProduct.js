import React, {Component} from 'react'
import './Detail.css'
import './AddProduct.css'
import UploadImage from './UploadImage'
import {addProduct} from '../AdminFunction'
import {Link} from 'react-router-dom'
import axios from '../../AxiosServer'
import jwt_decode from 'jwt-decode'
class AddProduct extends Component {
	constructor(){
		super();
		this.state={
			products:[]
		};
		this.changeHandler = this.changeHandler.bind(this);
        this.Submit = this.Submit.bind(this);
	}
	async componentDidMount() {
		await axios.get('/product/get-data')
		.then(response => this.setState({products:response.data}));
		const token = localStorage.usertoken;
		const decoded =jwt_decode(token);
		this.setState({
			role: decoded.role
		})
	}
    changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]:value});
    };
    Submit = (event) => {
        event.preventDefault();
        var { products, id, type, name, url, price} = this.state;
        price = parseInt(document.getElementById('price').value);
        type = document.getElementById('type').value;
        id = parseInt(products[products.length-1].id + 1);
        const Product = {
            id: id,
            type: type,
            name: name,
            url: url,
            price: price
        }
        addProduct(Product).then(res => {
        	alert("ADD PRODUCT SUCCESS !!!");
			this.props.history.push('/admin');
        })
    }
	CheckLogin = () =>{
		if(localStorage.length!=0)
		{
			const token = localStorage.usertoken;
			const decoded =jwt_decode(token);
			if(decoded.role!='admin')
				this.props.history.push('/');
		}
	};
	render() {
		{this.CheckLogin()};
		var { id, type, name, url, price} = this.state;
		return(
			<div className="container detail">
				<li className="nav_item homebutton">
					<Link to="/admin">Trở lại</Link>
				</li>
				<h1 className="detailTitle"> SẢN PHẨM </h1>
				<div className="col-sm-12 productDetail">
					<div className="product-info">
						<div className="col-sm-6 image">
							<UploadImage image={`${url}`} />
						</div>
						<div className="col-sm-6 infoproduct">
							<form onSubmit={this.Submit}>
								<div>
									<label>Type :</label>
									<select class="choose form-control" type="text" id="type" name="type">
										<option value hidden>Type of product</option>
										<option>dress</option>
										<option>vest</option>
										<option>shirt</option>
										<option>juyp</option>
										<option>aophong</option>
										<option>set</option>
									</select>
								</div>
								<div>
									<label for="">Name :</label>
									<input type="text" id="name" name="name" onChange={this.changeHandler} placeholder="Nhập tên sản phẩm" />
								</div>
								<div>
									<label for="">URL (URL Directly) :</label>
									<input type="text" id="url"  name="url" onChange={this.changeHandler} placeholder="Nhập đường dẫn" />
								</div>
								<div>
									<label for="">Price :</label>
									<input type="text" id="price" name="price" onChange={this.changeHandler} placeholder="Nhập giá" />
								</div>
								<button type="submit" className="addbtn btn btn-primary btn-block">Add Product</button>
							</form>
						</div>
					</div> 
				</div>
			</div>
		)
	}
}

export default AddProduct;