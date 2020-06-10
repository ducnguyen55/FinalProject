import React, {Component} from 'react';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import axios from '../AxiosServer';
import {Link} from 'react-router-dom';
import ListPayment from './ListPayment';
import './Payment.css';

const format_currency = (price) => {
	return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
class Payment extends Component {
	constructor(){
		super();
		this.state={
			productincart:[]
		}
	};
	getProductInCart = () => {
		this.state.productincart = JSON.parse(localStorage.getItem("cart"));
	}
	render(){
		{this.getProductInCart()};
		const {productincart} = this.state;
		return (
		<div className="BuyProduct">
			<header className="App-header">
				<Menu className='Menu' />
			</header>
			<div className="container ProductDetail">
				<div className="clearFix">
					<Link to="/" className="Top">Trang chủ</Link>
					<Link to="#" className="Top">Giỏ hàng</Link>
				</div>
				<div className="mainContent">
					<div className="boxProducts">
						<div className="colLeft">
							<div className="boxCart">
								<h3 className="titleProduct"> Thông tin giỏ hàng </h3>
									<ListPayment product={productincart} />
							</div>
						</div>
						<div className="colRight">
							<h3 className="titleProduct"> Đơn hàng </h3>
							<p class="price">
                				<span>Tổng Cộng: </span> 598,000
            				</p>
						</div>
					</div>
				</div>
			</div>
    	</div>
		)
	}
}

export default Payment;