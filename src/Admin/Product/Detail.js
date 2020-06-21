import React, {Component} from 'react'
import './Detail.css'
import {updateProduct} from '../AdminFunction'
import {deleteProduct} from '../AdminFunction'
import {Link} from 'react-router-dom'
import axios from '../../AxiosServer'
import jwt_decode from 'jwt-decode'
class Detail extends Component {
	constructor(){
		super();
		this.state={
			products:[],
			id: 0,
			type: "",
			name: "",
			url: "",
			price: 0
		};
		this.changeHandler = this.changeHandler.bind(this);
        this.Update = this.Update.bind(this);
        this.Delete = this.Delete.bind(this);
	}
	async componentDidMount() {
		await axios.get('/product/get-data')
		.then(response => this.setState({products:response.data}));
		const token = localStorage.usertoken;
		const decoded =jwt_decode(token);
		this.setState({
			role: decoded.role
		})
	};
	changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]:value});
    };
	Update = (event) => {
		event.preventDefault();
		var pid = parseInt(this.props.match.params.id);
        var { products, id, type, name, url, price} = this.state;
        name = document.getElementById('name').value;
        type = document.getElementById('type').value;
        url = document.getElementById('url').value;
        price = parseInt(document.getElementById('price').value);
        const Product = {
            id: pid,
            type: type,
            name: name,
            url: url,
            price: price
        }
        updateProduct(Product).then(res => {
        	alert("UPDATE SUCCESS !!!");
			this.props.history.push('/admin');
        })
    }
    Delete = (event) => {
		event.preventDefault();
		var pid = parseInt(this.props.match.params.id);
		var {id} = this.state;
		id = document.getElementById('id').value;
        const Product = {
            id: pid,
        }
        console.log(id);
        deleteProduct(Product).then(res => {
        	alert("DELETE SUCCESS !!!");
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
		var pid = parseInt(this.props.match.params.id);
		const {products} = this.state;
		return(
			<div className="container detail">	
					<a href="#" className="previous"> <Link to="/admin" style={{ textDecoration: 'none' }}><i class="addicon fa fa-arrow-left"></i>Trở lại</Link></a>
				<h1 className="detailTitle"> SẢN PHẨM </h1>
				{
					products.map((product,key) => {
						if(product.id===pid) {
							return(
								<div className="col-sm-12 productDetail">
									<div className="product-info">
										<div className="col-sm-6">
											<img alt='imageproduct' src={`${product.url}`} id="image"/>
										</div>
										<div className="col-sm-6 infoproduct">
											<form>
												<div>
													<label>ID :</label>
													<input type="text" id="id" name="id" onChange={this.changeHandler} value={product.id} />
												</div>
												<div>
													<label>Type :</label>
													<input type="text" id="type" onChange={this.changeHandler} value={product.type}/>
												</div>
												<div>
													<label for="">Name :</label>
													<input type="text" id="name" onChange={this.changeHandler} placeholder="Nhập tên sản phẩm" defaultValue={product.name} />
												</div>
												<div>
													<label for="">URL :</label>
													<input type="text" id="url" onChange={this.changeHandler} placeholder="Nhập đường dẫn" defaultValue={product.url} />
												</div>
												<div>
													<label for="">Price :</label>
													<input type="text" id="price" onChange={this.changeHandler} placeholder="Nhập giá" defaultValue={`${product.price}`} />
												</div>
												<button type="submit" className="btn btn-primary btn-block" onClick={this.Update} style={{"margin-left":"0px"}} >Save</button>
											</form>
										</div>
									</div> 
								</div>
								);
							}
						}
					)
				}
				<button type="submit" className="delete btn btn-primary btn-block" onClick={this.Delete}>Delete</button>
			</div>
		)
	}
}

export default Detail;