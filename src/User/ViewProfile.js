import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'
import {Link} from 'react-router-dom'
import axios from '../AxiosServer'
import Account from '../Menu/Account'
import {getCustomer} from '../UserFunction/UserFunction'
import './Profile.css'
class Profile extends Component {
		constructor(){
		super();
		this.state ={
			payments:[],
			progress:0,
			full_name:'',
			rank:''
		};
	}	
	componentDidMount(){
		const customerid = this.props.match.params.id;
		getCustomer(customerid).then(res => { 
			if(res) {
				console.log(res.full_name);
				this.setState({
					full_name: res.full_name,
					rank: res.rank
				})
			}
		})
	};
	CheckRank = () => {
		if(this.state.rank=="bronze")
			return <td style={{"text-transform":"uppercase","color":"#cd7f32"}}>{this.state.rank}</td>
		else if(this.state.rank=="silver")
			return <td style={{"text-transform":"uppercase","color":"#c0c0c0"}}>{this.state.rank}</td>
		else if(this.state.rank=="gold")
			return <td style={{"text-transform":"uppercase","color":"#FFD700"}}>{this.state.rank}</td>
		else if(this.state.rank=="diamond")
			return <td style={{"text-transform":"uppercase","color":"#b9f2ff","background-image":"linear-gradient(to right, red, #f06d06, rgb(255, 255, 0), green)"}}>{this.state.rank} <span style={{color:"#000"}}>(MAX RANK)</span></td>
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
		{this.Progress()};
		console.log(this.props.match.params.id);
		return (
			<div>
				<ul>
					<Account className="ProfileOwner" />
					<Link to="/">Home</Link>
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