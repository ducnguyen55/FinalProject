import React, {Component} from 'react';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import axios from '../AxiosServer';
import {Link} from 'react-router-dom';
import ListProduct from './ListProduct';
import jwt_decode from 'jwt-decode';
import {payment} from '../UserFunction/UserFunction';
import './Payment.css';

const format_currency = (price) => {
	return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
class Payment extends Component {
	constructor(){
		super();
		this.state={
			productincart:[],
			totalprice:0
		};
        this.Submit = this.Submit.bind(this);
        this.Total = this.Total.bind(this)
	};
	getProductInCart = () => {
		if(sessionStorage.getItem("cart")!=undefined)
		this.state.productincart = JSON.parse(sessionStorage.getItem("cart"));
	}
	Total = () => {
		var {productincart,totalprice} = this.state;
		this.state.totalprice = 0;
		if(productincart!=null){
			for (var i = 0;i < productincart.length; i++) {
				this.state.totalprice += productincart[i].price;
			}
		}
	}
	makeid = (length) => {
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
    Submit = (event) => {
        event.preventDefault();
        var id = this.makeid(10);
        var Payment;
        if(localStorage.usertoken!=undefined){
	        Payment = {
            customerid: jwt_decode(localStorage.usertoken)._id,
            paymentid: id,
            total: this.state.totalprice
        	}
        }
        if(localStorage.usertoken==undefined){
	        Payment = {
	            customerid: "",
	            paymentid: id,
	            total: this.state.totalprice
	        	}
        }
        payment(Payment).then(res => {
           	this.props.history.push('/')
    	})
    	sessionStorage.removeItem('cart');
    }
	render(){
		{this.getProductInCart()};
		{this.Total()};
		var {productincart,totalprice} = this.state;
		return (
		<div className="BuyProduct">
			<header className="App-header">
				<Menu className='Menu' />
			</header>
			<div className="container ProductDetail">
				<div className="clearFix">
					<Link to="/" className="Top">Home</Link>
					<Link to="#" className="Top">Cart</Link>
				</div>
				<div className="mainContent">
					<div className="boxProducts">
						<div className="colLeft">
							<div className="boxCart">
								<h3 className="titleProduct"> Cart information </h3>
									<ListProduct product={productincart} />
							</div>
						</div>
						<div className="colRight">
							<h3 className="titleProduct"> Order </h3>
							<p class="price">
                				<span>Total: </span> {format_currency(totalprice)}
            				</p>
            				<p class="total">
                				<span>Total pay: </span> <strong>{format_currency(totalprice)}</strong>
            				</p>
            				<div class="buyNow">
				                <div class="row">
				                    <div class="col-md-12 pay">
			                    		<Link to ="/">
					                    	<button id="btn-Continue" className="payment">
				                    			<i class="fa fa-shopping-cart"></i> Continue buy
					                    	</button>
			                    		</Link> 
				                    </div>
				                </div>
				                <div class="row">
									<div class="col-md-12 pay">
										<Link to="/thanh-toan">
											<button id="btn-BuyNow" className="payment"> 
												<i class="fa fa-usd"> </i>Pay
											</button>
										</Link>
									</div>
				                </div>
				            </div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
    	</div>
		)
	}
}

export default Payment;