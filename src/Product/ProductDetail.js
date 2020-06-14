import React, {Component} from 'react';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import './ProductDetail.css';
import axios from '../AxiosServer';
import {Link} from 'react-router-dom';
import ListProduct from './ListProduct';
const format_currency = (price) => {
	return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
class ProductDetail extends Component {
	constructor(){
		super();
		this.state={
			products:[],
			sameProducts:[],
			productcart:[]
		}
	};
	async componentDidMount() {
		await axios.get('/product/get-data')
		.then(response => this.setState({products:response.data}));
		}
	Convert = () => {
		const {products,sameProducts} = this.state;
		var pid = parseInt(this.props.match.params.id);
		products.map((good,i)=>{
			if(products[pid-1].type==good.type){
				sameProducts.push(good);
			}
		})
		while(sameProducts.length > 4 ){
			var x = Math.floor((Math.random() * sameProducts.length));
			sameProducts.splice(x,1);
		}
	}
	Cart = () => {
		const {products} = this.state;
		this.state.productcart = [];
		if(sessionStorage.cart)
			this.state.productcart = JSON.parse(sessionStorage.getItem("cart"));
		var pid = parseInt(this.props.match.params.id);
		products.map((product,key) => {
			if(product.id===pid)
				this.state.productcart.push(product);
		});
		// localStorage.setItem("cart",JSON.stringify(this.state.productcart));
		sessionStorage.setItem('cart',JSON.stringify(this.state.productcart));
		document.getElementById('cart-number').innerHTML = this.state.productcart.length;
	}
	Checkcart = () => {
		document.getElementById('cart-number').innerHTML = JSON.parse(sessionStorage.getItem("cart")).length;
	}
	render(){
		{this.Convert()};
		var pid = parseInt(this.props.match.params.id);
		const {products,sameProducts} = this.state;
		if(products.length==0){
			return <h1>Loading</h1>
		}		
		else{
			return (
			<div className="BuyProduct">
				<header className="App-header">
					<Menu className='Menu' />
				</header>
				<div className="container ProductDetail">
					<Link to="/" className="Top">Trang chủ</Link>
					<Link to="#" className="Top">{products[pid-1].name}</Link>
					<div className="container detail">
					{
						products.map((product,key) => {
							if(product.id===pid) {
								return(
									<div className="col-sm-12 productDetail" id="detail" style={{border:"none",margin:"20px"}}>
										<div className="product-info">
											<div className="col-sm-6 img">
												<img alt='imageproduct' src={`${product.url}`} id="image" />
											</div>
											<div className="col-sm-6 buy">
												<div className="productName">{product.name}</div>
												<div className="productPrice"><span>giá bán</span> {format_currency(product.price)}</div>
												<div className="productSize">
													<h3><label>Chọn size :</label></h3>
													<select class="size" type="size" id="size" name="size">
														<option value hidden>Chọn size</option>
														<option>S</option>
														<option>M</option>
														<option>L</option>
														<option>XL</option>
													</select>
												</div>
												<div class="col-md-12 pay">
													<Link to ="/">
														<button id="btn-Continue" onClick={this.Cart}><i class="fa fa-shopping-cart"></i> Cho vào giỏ hàng 
														</button>
													</Link>
												</div>
												<div class="col-md-12 pay">
													<Link to="/gio-hang">
														<button id="btn-BuyNow" onClick={this.Cart}> <i class="fa fa-usd"> </i>Mua ngay </button>
													</Link>
												</div>
											</div>
										</div> 
									</div>
									);
								}
							}
						)
					}
					</div>
					<div className="col-sm-7">
						<button className="bt-info">Thông tin sản phẩm</button>
						<button className="bt-review">Nhận xét sản phẩm</button>
					</div>
				</div>
				<div className="container row col-md-12 involve ">Sản phẩm liên quan</div>
				<div className="container row col-md-12 product" onClick={() => window.location.reload(false)}>
					<ListProduct product={sameProducts}/>
				</div>
				<Footer />
	    	</div>
    		)
    	}
  	};
}

export default ProductDetail;