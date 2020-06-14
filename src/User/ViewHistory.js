import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'
import {Link} from 'react-router-dom'
import axios from '../AxiosServer'
import './Profile.css'
import SearchPayment from './SearchPayment'
import {getpayment} from '../UserFunction/UserFunction'
const format_currency = (price) => {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
	}
const ViewHistory = (payments,role) => {
		if(role=="admin")
			return(
				payments.map((payment,i) => {
				return (
					<tr className="text-center">
						<td>{payment.customerid}</td>
						<td>{payment.paymentid}</td>
						<td>{format_currency(payment.total)}</td>
						<td>{payment.date.split('T',10)[0]}</td>
					</tr>
					);
				})
			)
		else
			return(
				payments.map((payment,i) => {
				return (
					<tr className="text-center">
						<td>{payment.paymentid}</td>
						<td>{format_currency(payment.total)}</td>
						<td>{payment.date.split('T',10)[0]}</td>
					</tr>
					);
				}
			)
		)
	}
class Profile extends Component {
		constructor(){
		super();
		this.state ={
			payments:[],
			paymentsrole:[],
			currentPage: 1,
          	paymentsPerPage: 10,
          	searchfield:'',
			role:'',
			customerid:'',
		};
		this.logOut = this.logOut.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	logOut(e){
			e.preventDefault();
			localStorage.removeItem('usertoken');
			this.props.history.push('/');
	}
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
    }
    onSearchChange = (event) => {
    	this.setState({searchfield: event.target.value});
    }
	componentDidMount(){
		var token;
		if(localStorage.length!=0)
		{
			token = localStorage.usertoken;
			const decoded =jwt_decode(token);
			this.setState({
				full_name: decoded.full_name,
				gmail: decoded.gmail,
				role: decoded.role,
				customerid: decoded._id
			})
		}
		axios.get('/payment/get-data')
		.then(response => this.setState({payments:response.data}));
	}
	CheckRole(){
		if(this.state.role=="admin")
			return <li className="nav_item"><Link to="/admin">Admin Page</Link></li>
	}
	CheckLogin = () =>{
		if(localStorage.length==0){
			this.props.history.push("/");
		}
	};
	AdminHistory(){
		if(this.state.role=="admin")
			return <td>Customer ID</td>
	}
	render() {
		{this.CheckLogin()};
		this.state.paymentsrole=[];
		if(this.state.role=="admin")
			this.state.paymentsrole=this.state.payments;
		else
			this.state.payments.map((payment,i) => {
				if(payment.customerid==this.state.customerid)
					this.state.paymentsrole.push(payment);
		})
		console.log(this.state.paymentsrole);
		//Search Product
		const filteredpayments = this.state.paymentsrole.filter(payment => {
    		return payment.paymentid.toLowerCase().includes(this.state.searchfield.toLowerCase());
    	})
		//Render Pagination
		const {payments, currentPage, paymentsPerPage} = this.state;
        const indexOfLastTodo = currentPage * paymentsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - paymentsPerPage;
        const currentpayments = filteredpayments.slice(indexOfFirstTodo, indexOfLastTodo);
        const renderproduct = ViewHistory(currentpayments,this.state.role);
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredpayments.length / paymentsPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
          );
        });
        if(!payments.length)
        	return <h1>Loading</h1>
        else
		return (
			<div>
				<ul>
					<li className="nav-item">
						<a href="" onClick={this.logOut} className="nav-link">
						Logout
						</a>
					</li>
					<li className="nav_item">
						<Link to="/">Trang chủ</Link>
					</li>
					<li className="nav_item">
						<Link to="/profile">Profile</Link>
					</li>
					<li className="nav_item">
						<Link> Lịch sử mua hàng</Link>
					</li>
					{this.CheckRole()}
				</ul>
				<div className ="container history-view" id="history-view">
					<h4 className="text-center">LỊCH SỬ MUA HÀNG</h4>
					<SearchPayment searchChange={this.onSearchChange}/>
					<table className="table col-md-10 mx-auto">
						<tbody>
							<tr className="text-center">
								{this.AdminHistory()}
								<td>Payment ID</td>
								<td>Total</td>
								<td>Day</td>
							</tr>
		                	{renderproduct}
						</tbody>
					</table>
	    	        <ul id="page-numbers" className="text-center">
            	  		{renderPageNumbers}
            		</ul>
				</div>
			</div>
		)
	}
}

export default Profile;