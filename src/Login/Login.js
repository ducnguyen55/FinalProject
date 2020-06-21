import React, {Component} from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
import {login} from '../UserFunction/UserFunction';
import {User} from '../Menu/Menu';
class Login extends Component {
	constructor(){
		super();
		this.state={
			gmail: '',
			password: '',
		};
		this.changeHandler = this.changeHandler.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}
    changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]:value});
    };
	onSubmit(event){
        event.preventDefault();

		const User = {
			gmail:this.state.gmail,
			password:this.state.password
		}

		login(User).then(res => { 
			if(res) {
					this.props.history.push('/profile')
			}
		})
	}
	CheckLogin(){
		const token = localStorage.usertoken;
		if(token){
			this.props.history.push('/');
		}
	}
	render(){
		{this.CheckLogin()};
		return (
			<div className="Login-Form">
				<div className="container">
					<div className="row mt-5">
						<div className="col-md-6 m-auto">
							<div className="login">
								<div className="Title-login">
									<i class="fa fa-sign-in" aria-hidden="true"></i>
								</div>
								<span id="confirm"></span>
								<form onSubmit={this.onSubmit}>
									<div>
										<label for="email">Email :</label>
										<input type="gmail" id="gmail" name="gmail" onChange={this.changeHandler} placeholder="Email" />
									</div>
									<div>
										<label for="password">Password :</label>
										<input type="password" id="password" name="password" onChange={this.changeHandler} placeholder="Password" />
									</div>
									<button type="submit" className="btn btn-primary btn-block" onClick={this.login} style={{"margin-left":"0px"}}>Login</button>
								</form>
								<p className="Info">
									No Account?
									<Link to="/dangky">Register</Link>
									<Link to="/">Home</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;