import React, {Component} from 'react';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import axios from '../AxiosServer';
import {Link} from 'react-router-dom';
import ListPaymentDetailProduct from './ListPaymentDetailProduct';
import jwt_decode from 'jwt-decode';
import {payment} from '../UserFunction/UserFunction';
import './Payment.css';

const format_currency = (price) => {
	return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
class PaymentDetail extends Component {
	constructor(){
		super();
		this.state={
			payments:[],
			cart:[],
			}
		};
	async componentDidMount() {
		await axios.get('/payment/get-data')
		.then(response => this.setState({payments:response.data}));
	}
	getcart = () => {
		var pid = this.props.match.params.id;
		var {payments} = this.state;
		this.state.payments.map((payment,i) => {
			if(payment._id==pid)
				this.state.cart=payment.cart;
		})
	}
	render(){
		{this.getcart()}
		console.log(this.state.cart);
		return (
		<div className="BuyProduct">
			<header className="App-header">
				<h2 className="text-center">THÔNG TIN CHI TIẾT</h2>
			</header>
			<div className="container ProductDetail">
				<div className="clearFix">
					<Link to="/Profile" className="Top">Profile</Link>
					<Link to="#" className="Top">Thông tin chi tiết</Link>
				</div>
				<div className="mainContent">
					<div className="boxProducts">
						<div className="colLeft">
							<div className="boxCart">
								<h3 className="titleProduct"> Thông tin giỏ hàng </h3>
								<ListPaymentDetailProduct product={this.state.cart} />
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

export default PaymentDetail;