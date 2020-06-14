import React, {Component} from 'react';
import './Register.css';
import {Link} from 'react-router-dom';
import {register} from '../UserFunction/UserFunction';

class Register extends Component {
    constructor(){
        super();
        this.state={
            name: '',
            gmail: '',
            password: '',
            role: 'user'
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.Submit = this.Submit.bind(this)
    }
    changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]:value});
    };
    Submit = (event) => {
        event.preventDefault();

        const User = {
            full_name: this.state.name,
            gmail: this.state.gmail,
            password: this.state.password,
            role: this.state.role
        }
        var confirmpw = document.getElementById('confirm').value;
        var password = document.getElementById('password').value;
        if(password==confirmpw)
	        register(User).then(res => {
	            if(res)
	            	this.props.history.push('/dangnhap')
	        })
	    else
	    	{
	    		var message = document.getElementById('message');
	            message.innerHTML='Password và Confirm Password phải giống nhau';
        		message.style.color="red";
	    	};
    }
    CheckLogin(){
        const token = localStorage.usertoken;
        if(token)
            this.props.history.push('/');
    }
	render(){
        {this.CheckLogin()};
		return (
			<div className="Register-Form">
				<div className="container">
					<div className="row mt-5">
						<div className="col-md-6 m-auto">
							<div className="register">
								<div className="Title-register">
									<i class="fa fa-user" aria-hidden="true"></i>
								</div>
								<span id="message"></span>
								<form onClick={this.handleSubmit}>
									<div>
										<label for="name">Full name :</label>
										<input type="name" id="name" name="name" onChange={this.changeHandler} placeholder="Name" />
									</div>
									<div>
										<label for="gmail">Gmail :</label>
										<input type="gmail" id="gmail" name="gmail" onChange={this.changeHandler} placeholder="Email" />
									</div>
									<div>
										<label for="password">Password :</label>
										<input type="password" id="password" name="password" onChange={this.changeHandler} placeholder="Password" />
										<label for="password">Confirm Password :</label>
										<input type="password" id="confirm" name="password" onChange={this.changeHandler} placeholder="Confirm Password" />
									</div>
									<button type="submit" className="btn btn-primary btn-block" onClick={this.Submit}>Register</button>
								</form>
								<p className="Info">
									Haven an Account?
									<Link to="/dangnhap">Đăng nhập</Link>
									<Link to="/">Trang chủ</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;