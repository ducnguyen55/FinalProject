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
			sameProducts:[]
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
			console.log(x);
			sameProducts.splice(x,1);
		}
	}
	render(){
		{this.Convert()};
		var pid = parseInt(this.props.match.params.id);
		const {products,sameProducts} = this.state;
		console.log(sameProducts);
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
					<div className="container detail" style={{background: "#f8f8f8"}}>
					{
						products.map((product,key) => {
							if(product.id===pid) {
								return(
									<div className="col-sm-12 productDetail" style={{border:"none",margin:"20px"}}>
										<div className="product-info">
											<div className="col-sm-6">
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
												<div class="col-md-12">
													<button id="btn-Continue"><i class="fa fa-shopping-cart"></i> Cho vào giỏ hàng </button>
												</div>
												<div class="col-md-12">
													<button id="btn-BuyNow"> <i class="fa fa-usd"> </i>Mua ngay </button>
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
  	}
}

export default ProductDetail;