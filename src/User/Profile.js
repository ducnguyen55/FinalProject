import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'
import {Link} from 'react-router-dom'
import axios from '../AxiosServer'
import './Profile.css'
const format_currency = (price) => {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
	}
class Profile extends Component {
		constructor(){
		super();
		this.state ={
			full_name: '',
			gmail: '',
			payments:[]
		};
		this.logOut = this.logOut.bind(this);
	}
	logOut(e){
			e.preventDefault();
			localStorage.removeItem('usertoken');
			this.props.history.push('/');
	}
	componentDidMount(){
		if(localStorage.length!=0)
		{
			const token = localStorage.usertoken;
			const decoded =jwt_decode(token);
			this.setState({
				full_name: decoded.full_name,
				gmail: decoded.gmail,
				role: decoded.role
			})
			console.log(decoded.role);
		}
		axios.get('/payment/get-data')
		.then(response => this.setState({payments:response.data}));
	};
	CheckRole(){
		if(this.state.role=="admin")
			return <li className="nav_item"><Link to="/admin">Admin Page</Link></li>
	}
	CheckLogin = () =>{
		if(localStorage.length==0){
			this.props.history.push("/");
		}
	};
	render() {
		{this.CheckLogin()};
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
						<Link to="/profile/history"> Purchase History</Link>
					</li>
					{this.CheckRole()}
				</ul>
				<div className ="container">
					<div className ="jumbotron mt-5">
						<div className="col-sm-8 mx-auto">
							<h1 className="text-center">PROFILE</h1>
						</div>
						<table className="table col-md-6 mx-auto">
							<tbody>
								<tr>
									<td>Full Name</td>
									<td>{this.state.full_name}</td>
								</tr>
								<tr>
									<td>Gmail</td>
									<td>{this.state.gmail}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}

export default Profile;