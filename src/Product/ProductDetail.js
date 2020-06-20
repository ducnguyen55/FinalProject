import React, {Component} from 'react';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import './ProductDetail.css';
import axios from '../AxiosServer';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import ListProduct from './ListProduct';
import {createComment} from '../UserFunction/UserFunction';
import {deleteComment} from '../Admin/AdminFunction';
import ListComment from './ListComment';
const format_currency = (price) => {
	return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
class ProductDetail extends Component {
	constructor(){
		super();
		this.state={
			products:[],
			sameProducts:[],
			productcart:[],
			customerid:'',
			productid:'',
			comments:[]
		};
		this.onSubmit = this.onSubmit.bind(this);
	};
	async componentDidMount() {
		this.state.comments=[];
		if(localStorage.length!=0)
		{
			const token = localStorage.usertoken;
			const decoded =jwt_decode(token);
			this.state.customerid = decoded._id;
		}
		await axios.get('/product/get-data')
		.then(response => this.setState({products:response.data}));
		await axios.get('/comment/get-data')
		.then(response => this.setState({comments:response.data}));
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
	Review = () => {
		document.getElementById('reviewcomment').style.display="block";
	}
	Product = () => {
		document.getElementById('reviewcomment').style.display="none";
	}
	onSubmit(event){
		if(localStorage.usertoken!=undefined){
	        var comment = document.getElementById('txtComment').value;
			const Comment = {
				customerid: this.state.customerid,
				productid: this.state.productid,
				comment: comment
			}
	        if(comment.search("xấu")==-1 && comment.search("dỏm")==-1)
	        	createComment(Comment).then(res => { 
					document.getElementById('txtComment').value ='';
					alert("Cảm ơn đã góp ý");
					axios.get('/comment/get-data')
					.then(response => this.setState({comments:response.data}));
				}
			)
	        else{
	        	document.getElementById('txtComment').value ='';
	        	alert("Chỉ được khen ko được chê");
	        }
	    }
		else
			alert("Cần phải login trước khi comment");
	}
	render(){
		{this.Convert()};
		var pid = parseInt(this.props.match.params.id);
		const {products,sameProducts,comments} = this.state;
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
					<Link to="/" className="Top">Home</Link>
					<Link to="#" className="Top">{products[pid-1].name}</Link>
					<div className="container detail">
					{
						products.map((product,key) => {
							if(product.id===pid) {
								this.state.productid=product._id;
								return(
									<div className="col-sm-12 productDetail" id="detail" style={{border:"none",margin:"20px"}}>
										<div className="product-info">
											<div className="col-sm-6 img">
												<img alt='imageproduct' src={`${product.url}`} id="image" />
											</div>
											<div className="col-sm-6 buy">
												<div className="productName">{product.name}</div>
												<div className="productPrice"><span>Price</span> {format_currency(product.price)}</div>
												<div className="productSize">
													<h3><label>Size :</label></h3>
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
														<button id="btn-Continue" onClick={this.Cart}><i class="fa fa-shopping-cart"></i> Add to cart 
														</button>
													</Link>
												</div>
												<div class="col-md-12 pay">
													<Link to="/gio-hang">
														<button id="btn-BuyNow" onClick={this.Cart}> <i class="fa fa-usd"> </i>Buy</button>
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
					<div className="col-sm-12">
						<button className="bt-info" onClick={this.Product}>Product information</button>
						<button className="bt-review" onClick={this.Review}>Product Reviews</button>
						<div id="reviewcomment" style={{display:"none"}}>
							<div className="boxContact">
								<div className="form-login">
									<div className="inner">
										<div className="line">
											<textarea id="txtComment" name="comment" placeholder="Thêm bình luận"></textarea>
										</div>
									</div>
								</div>
							</div>
							<button type="submit" id="submitComment" onClick={this.onSubmit}> Gửi </button>
							<br></br>
							<h5 style={{color:"blue","font-size":"15px"}}>Những comment được chọn lọc ...</h5>
							<ListComment comments={this.state.comments} productid={this.state.productid} />
						</div>
					</div>
				</div>
				<div className="container row col-md-12 involve ">Related Products</div>
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