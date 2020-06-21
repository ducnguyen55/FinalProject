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
			payments:[],
			progress:0
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
				role: decoded.role,
				rank: decoded.rank,
				total: decoded.total
			})
			console.log(decoded);
		}
		axios.get('/payment/get-data')
		.then(response => this.setState({payments:response.data}));
	};
	CheckRole(){
		if(this.state.role=="admin")
		return <li class="nav-item"><Link to="/admin"> <i class="addicon fa fa-shield"></i>Admin Page</Link></li>
	}
	CheckLogin = () => {
		if(localStorage.length==0){
			this.props.history.push("/");
		}
	};
	CheckRank = () => {
		if(this.state.rank=="bronze")
			return <td style={{"text-transform":"uppercase","color":"#cd7f32"}}>{this.state.rank}</td>
		else if(this.state.rank=="silver")
			return <td style={{"text-transform":"uppercase","color":"#c0c0c0"}}>{this.state.rank}</td>
		else if(this.state.rank=="gold")
			return <td style={{"text-transform":"uppercase","color":"#FFD700"}}>{this.state.rank}</td>
		else
			return <td style={{"text-transform":"uppercase","color":"#b9f2ff","background-image":"linear-gradient(to right, red, #f06d06, rgb(255, 255, 0), green)"}}>{this.state.rank} <span style={{color:"#000"}}>(MAX)</span></td>
	}
	Progress = () => {
        if(this.state.rank=="bronze"){
        	this.state.progress = this.state.total/500000*100;
        }
        else if(this.state.rank=="silver"){
        	this.state.progress = this.state.total/5000000*100;
        }
        else if(this.state.rank=="gold"){
			this.state.progress = this.state.total/10000000*100;
        }
	}
	render() {
		{this.CheckLogin()};
		{this.Progress()};
		return (
			<div>
				<div class="sidenav">
					<li class="nav-item"><Link to="/" style={{}}><i class="addicon fa fa-home"></i>Home Page</Link></li>
					<li class="nav-item"><Link to="/profile"><i class="addicon fa fa-user"></i>Profile</Link></li>
					<li class="nav-item"><Link to="/profile/history"> <i class="addicon fa fa-history"></i>Purchase history</Link></li>	
					{this.CheckRole()}
					<li class="nav-item"><a href="" onClick={this.logOut} className="nav-link"> <i class="addicon fa fa-sign-out"></i>Logout</a></li>	
						
				</div>
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
								<tr>
									<td>Rank</td>
				                	{this.CheckRank()}
								</tr>
							</tbody>
						</table>
	                	<div className="skill_progress">
	                    	<span style={{width: `${this.state.progress}%`}}/>
	                	</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Profile;