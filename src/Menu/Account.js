import React, {Component} from 'react';
import './Menu.css';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode'

class Account extends Component {
	constructor(){
		super();
		this.state ={
			full_name: ''
		};
	}
	componentDidMount(){
		if(localStorage.length!=0){
			const token = localStorage.usertoken;
			const decoded =jwt_decode(token);
			this.setState({
				full_name: decoded.full_name
			})
		}
	};
	render() {
		const token = localStorage.usertoken;
		if(!token)
		{
			return (
				<div className="account">
					<Link to='/dangky' className="nav-link">Đăng ký</Link>
					<span>/</span>
					<Link to='/dangnhap' className="nav-link">Đăng nhặp</Link>
				</div>
			);
		}
		else
		{
			return (
				<div className="account">
					<Link to="/profile"><h6 id="CustomerName">{this.state.full_name}</h6></Link>
				</div>		
			);
		}
	}
}
export default Account;
