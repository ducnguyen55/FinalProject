import React, {Component} from 'react';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import axios from '../AxiosServer';
import {Link} from 'react-router-dom';
import ListProduct from './ListProduct';
import jwt_decode from 'jwt-decode';
import {payment} from '../UserFunction/UserFunction';
import './ThanhToan.css';
import ListRenderProduct from './ListRenderProduct';

const format_currency = (price) => {
	return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

class Payment extends Component {
	constructor(){
		super();
		this.state={
			productincart:[],
			totalprice:0,
			fullname:"",
			gmail:"",
			phone:"",
			address:"",
			more:"",
			rank:'none'
		};
        this.Submit = this.Submit.bind(this);
        this.Total = this.Total.bind(this);
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
    changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]:value});
    }
    Submit = (event) => {
        event.preventDefault();
        var id = this.makeid(10);
        var Payment;
        var fullname = document.getElementById('txtFullName').value;
        var gmail = document.getElementById('txtEmail').value;
        var phone = document.getElementById('txtPhone').value;
        var address = document.getElementById('txtAddress').value;
        var more = document.getElementById('txtContent').value;
        if(localStorage.usertoken!=undefined){
	        Payment = {
            customerid: jwt_decode(localStorage.usertoken)._id,
            paymentid: id,
            fullname: fullname,
            gmail: gmail,
            phone: phone,
            address: address,
            more: more,
            cart: JSON.parse(sessionStorage.getItem("cart")),
            total: this.state.totalprice
        	}
        }
        if(localStorage.usertoken==undefined){
	        Payment = {
	            customerid: "",
	            paymentid: id,
                fullname: fullname,
	            gmail: gmail,
	            phone: phone,
	            address: address,
	            more: more,
	            total: this.state.totalprice
	        	}
        }
        payment(Payment).then(res => {
           	this.props.history.push('/')
    	})
    	sessionStorage.removeItem('cart');
    }
    CheckLogin = () => {
    	if(localStorage.usertoken!=undefined)
    	{
    		var customer = jwt_decode(localStorage.usertoken);
			return	(
				<div className="line">
	    			<input type="text" id="txtFullName" name="fullname" onChange={this.changeHandler} value={customer.full_name} required="" className="form-control" placeholder="Họ và tên"/>
				</div>
			)
    	}
    	else
			return	(
				<div className="line">
	    			<input type="text" id="txtFullName" name="fullname" onChange={this.changeHandler} required="" className="form-control" placeholder="Full name"/>
				</div>
			)
    }
    Discount = () => {
    	var customer;
    	if(localStorage.usertoken!=undefined){
    		customer =jwt_decode(localStorage.usertoken);
    		this.state.rank=customer.rank;
    	}
    	const {rank} = this.state;
    	if(rank=="bronze")
    		this.state.totalprice=this.state.totalprice*0.99;
    	else if(rank=="silver")
    		this.state.totalprice=this.state.totalprice*0.95;
    	else if(rank=="gold")
    		this.state.totalprice=this.state.totalprice*0.90;
    	else if(rank=="diamond")
    		this.state.totalprice=this.state.totalprice*0.85;
    	else
    		this.state.totalprice=this.state.totalprice*1;
    }
	render(){
		{this.getProductInCart()};
		{this.Total()};
		{this.Discount()};
		var {productincart,totalprice} = this.state;
		return (
		<div className="BuyProduct">
			<header className="App-header">
				<Menu className='Menu' />
			</header>
			<div className="container ProductDetail">
				<div className="clearFix">
					<Link to="/" className="Top">Home</Link>
					<Link to="#" className="Top">Pay</Link>
				</div>
				<div className="mainContent">
					<div className="boxProducts">
						<div className="colThree">
							<div className="item itemPay" style={{height:"450px"}}>
								<h3 class="titleProduct">
									Customer information
								</h3>
								<div className="boxContact">
									<div className="form-login">
										<div className="inner">
											{this.CheckLogin()}
											<div className="line">
												<input type="email" id="txtEmail" name="gmail" onChange={this.changeHandler} required="" className="form-control" placeholder="Email"/>
											</div>
											<div className="line">
												<input type="phone" id="txtPhone" name="phone" onChange={this.changeHandler} required="" className="form-control" placeholder="Phone"/>
											</div>
											<div className="line">
											    <input type="text" id="txtAddress" name="address" onChange={this.changeHandler} required="" className="form-control" placeholder="Address"/>
											</div>
											<div className="line">
												<textarea id="txtContent" name="more" onChange={this.changeHandler} placeholder="Required"></textarea>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="item itemPay" style={{height:"450px"}}>
								<h3 class="titleProduct">
									method of receiving goods
					            </h3>
					            <div class="formGroup">
					                <input type="radio" id="shipping" checked="checked" name="optradio"/>
				    	            <label for="shipping">Delivery</label>
				        	    </div>
				        	    <h3 class="titleProduct">
					                payment methods
					            </h3>
					            <div class="formGroup">
					                <input type="radio" name="optPay" id="receive" checked="checked"/>
					                <label for="receive">Cash on delivery</label>
					            </div>
							</div>
							<div className="item itemPay" style={{height:"450px"}}>
								<div class="summary clearFix">
					                <h3 class="titleProduct" style={{"text-align":"center"}}>
					                    payment information
					                </h3>
					                <ListRenderProduct product={productincart} />
            					</div>
            					<div class="total clearFix">
					                <p class="money pullLeft" style={{"font-size":"18px"}}>Total</p>
					                <p class="pullRight" style={{"font-size":"18px"}}><strong>{format_currency(totalprice)}</strong>
					                </p>
					            </div>
					            <div class="process">
									<button id="btn-BuyNow" className="payment" style={{"width":"100%","margin":"0 auto"}} onClick={this.Submit}> 
										<i class="fa fa-check" aria-hidden="true" style={{"margin-right":"5px"}}></i> Complete Payment
									</button>
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