import React, {Component} from 'react';
import './Menu.css';
import {Link} from 'react-router-dom';
import Account from './Account';
class Menu extends Component {
    constructor(props){
        super();
        this.state={
        };
    }
	render(){
		return (
				<div className="Menu">
					<div className="container">
						<Link to='/'><img src={`https://i.ibb.co/D8YLbLp/logo.jpg`} alt='logo' className='mx-auto d-block img-fluid' id='logo'/></Link>
						<nav className="navbar navbar-expand-lg navbar-light">
							<a className="navbar-brand" href="#"></a>
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						    <span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse" id="navbarNav">
						    	<ul className="navbar-nav">
									<li className="nav-item">
										<Link to='/Dress' className="nav-link" >Đầm</Link>
									</li>
							    	<li className="nav-item">
										<Link to='/Vest' className="nav-link" >vest</Link>
									</li>
									<li className="nav-item">
										<Link to='/Shirt' className="nav-link" >Sơ mi</Link>
									</li>
									<li className="nav-item">
										<Link to='/Juyp' className="nav-link" >Juyp</Link>
									</li>
									<li className="nav-item">
										<Link to='/TShirt' className="nav-link" >Áo Phông</Link>
									</li>
									<li className="nav-item">
										<Link to='/Set' className="nav-link" >Set bộ</Link>
									</li>
						    	</ul>
						  	</div>
						</nav>
						<Account />
					</div>
				</div>
		);
	}
}

export default Menu;
