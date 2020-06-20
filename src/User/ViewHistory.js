import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'
import {Link} from 'react-router-dom'
import axios from '../AxiosServer'
import './Profile.css'
import SearchPayment from './SearchPayment'
import {getpayment} from '../UserFunction/UserFunction'
import {updatepayment} from '../UserFunction/UserFunction'
const format_currency = (price) => {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
function removeduplicate(MergeSearch) {
	let unique = MergeSearch.reduce(function(a, b) {
		if(a.indexOf(b) < 0) a.push(b);
		return a;
	}, []);
	return unique;
}

// const Convert = (payment) => {
// 	if(status=="notdelivery")

// }

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
			return( 
				<tr className="text-center">
					<td>Customer ID</td>
					<td>Payment ID</td>
					<td>Name</td>
					<td>Phone</td>
					<td>Total</td>
					<td>Day</td>
					<td>Status</td>
				</tr>
				)
		else
			return( 
				<tr className="text-center">
					<td>Payment ID</td>
					<td>Total</td>
					<td>Day</td>
					<td>Status</td>
				</tr>
				)
	};
	ViewHistory = (payments,role) => {
		if(role=="admin")
			return(
				payments.map((payment,i) => {
				return (
					<tr className="text-center">
						<td>{payment.customerid}</td>
						<td>{payment.paymentid}</td>
						<td>{payment.fullname}</td>
						<td>{payment.phone}</td>
						<td>{format_currency(payment.total)}</td>
						<td>{payment.date.split('T',10)[0]}</td>
						{this.StatusPayment(payment)}
						<Link to={"/payment/detail/" + `${payment._id}`}><button id="btndetail"> Detail </button></Link>
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
						{this.StatusPayment(payment)}
					</tr>
					);
				}
			)
		)
	}
	StatusPayment = (payment) => {
		function Update() {
			console.log(payment.status);
			var status;
			if(payment.status=="notdelivery")
				status="delivery";
			else
				status="done";
			const Payment = {
		        paymentid: payment.paymentid,
		        status: status
		    }
		    console.log(Payment);
		    updatepayment(Payment).then(res => {
		    	alert("Update success");
		    	window.location.reload(true);
			})
		}
		if(this.state.role=="admin"){
			if(payment.status=="notdelivery")
				return <td style={{color:"red","cursor": "pointer"}} onClick={Update}>Not Delivery</td>
			else if(payment.status=="delivery")
				return <td style={{color:"green","cursor": "pointer"}} onClick={Update}>Delivery</td>
			else
				return <td style={{color:"blue"}}>DONE</td>
			}
		else{
			if(payment.status=="notdelivery")
				return <td style={{color:"red"}}>Chưa giao hàng</td>
			else if(payment.status=="delivery")
				return <td style={{color:"green"}}>Đang giao hàng</td>
			else
				return <td style={{color:"blue"}}>Đã nhận hàng</td>
		}			
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
		//Search by customerid
		const filteredpaymentsByCustomerID = this.state.paymentsrole.filter(payment => {
			var Search = payment.customerid.toLowerCase().includes(this.state.searchfield.toLowerCase());
    		return Search;
    	})
    	//Search by paymentid
		const filteredpaymentsByPaymentID = this.state.paymentsrole.filter(payment => {
			var Search = payment.paymentid.toLowerCase().includes(this.state.searchfield.toLowerCase());
    		return Search;
    	})
    	//Search by Phone
		const filteredpaymentsByPhone = this.state.paymentsrole.filter(payment => {
			var Search = payment.phone.includes(this.state.searchfield);
    		return Search;
    	})
    	var SearchByCustomerId=filteredpaymentsByCustomerID;
    	var SearchByPaymentId=filteredpaymentsByPaymentID;
    	var SearchByPhone=filteredpaymentsByPhone;
    	//Merge Search
    	var MergeSearch = SearchByCustomerId.concat(SearchByPaymentId).concat(SearchByPhone);
    	var Search = [];
    	Search = removeduplicate(MergeSearch);
		//Render Pagination
		const {payments, currentPage, paymentsPerPage} = this.state;
        const indexOfLastTodo = currentPage * paymentsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - paymentsPerPage;
        const currentpayments = Search.slice(indexOfFirstTodo, indexOfLastTodo);
        const renderproduct = this.ViewHistory(currentpayments,this.state.role);
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(Search.length / paymentsPerPage); i++) {
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
						<Link to="/">Home</Link>
					</li>
					<li className="nav_item">
						<Link to="/profile">Profile</Link>
					</li>
					<li className="nav_item">
						<Link> Purchase history</Link>
					</li>
					{this.CheckRole()}
				</ul>
				<div className ="container history-view" id="history-view">
					<h4 className="text-center">PURCHASE HISTORY</h4>
					<SearchPayment searchChange={this.onSearchChange}/>
					<table className="table col-md-12 mx-auto">
						<tbody>
							{this.AdminHistory()}
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
					
{/*<form style={{display:"flex"}}>
   <input type='radio' className="radio" id='undelivery' value='undelivery' /> Chưa giao hàng<br/>
   <input type='radio' className="radio" id='delivery' value='delivery'/> Đang giao hàng<br/>
   <input type='radio' className="radio" id='done' value='done'/> Đã nhận hàng<br/>
</form>*/}