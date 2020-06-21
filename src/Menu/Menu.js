import React, {Component} from 'react';
import './Menu.css';
import {Link} from 'react-router-dom';
import Account from './Account';
class Menu extends Component {
    constructor(){
        super();
        this.state={
        	search:''
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }
    changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]:value});
        console.log(value);
    };
	onSubmit(event){
		this.props.history.push('/');
	}
  //  	SearchDisplay = () => {
		// var modal = document.getElementById('txtSearch');
		// var searchform = document.getElementById('searchform');
		// var Appbackground = document.getElementById('App');
		// var detail = document.getElementById('detail');			
		// window.onclick = function(event) {
		//     if (searchform.style.display =="block" && event.target != modal) {
		//     	searchform.style.display ="none";
		//     	Appbackground.style.background = "rgba(0,0,0,0)";
		//     	var image = document.getElementsByTagName('img')
		//     	for(var i = 0 ; i < image.length ; i ++ )
		//     		image[i].style.zIndex = "-1";
  //   			if(detail != null)
  //   				detail.style.zIndex="0";
		//     	var btn = document.getElementsByTagName('button')
		//     	for(var i = 0 ; i < btn.length ; i ++ )
		//     		btn[i].style.zIndex = "0";
		//     }
		//     else if(event.target.id=="searchicon"){
		//     	searchform.style.display ="block";
		//     	Appbackground.style.background = "rgba(0,0,0,0.7)";
		//     	var image = document.getElementsByTagName('img')
		//     	for(var i = 0 ; i < image.length ; i ++ )
		//     		image[i].style.zIndex = "-10";
  //   			if(detail != null)
  //   				detail.style.zIndex="-10";
		//     	var btn = document.getElementsByTagName('button')
		//     	for(var i = 0 ; i < btn.length ; i ++ )
		//     		btn[i].style.zIndex = "-10";
		//     }
		// }
  //  	}
	render(){
		var CartNumber = 0;
		if(JSON.parse(sessionStorage.getItem("cart")))
			CartNumber = JSON.parse(sessionStorage.getItem("cart")).length;
		return (
				<div className="Menu" >
					<div className="container">
						<Link to='/'><img src={`https://i.ibb.co/D8YLbLp/logo.jpg`} alt='logo' className='mx-auto d-block img-fluid' id='logo'/></Link>
						<nav className="navbar navbar-expand-lg navbar-light">
							<a className="navbar-brand" href="#"></a>
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						    <span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse" id="navbarNav">
						    	<ul className="navbar-nav col-sm-11">
									<li className="nav-item">
										<Link to='/Dress' className="nav-link" >Dress</Link>
									</li>
							    	<li className="nav-item ">
										<Link to='/Vest' className="nav-link" >Vest</Link>
									</li>
									<li className="nav-item">
										<Link to='/Shirt' className="nav-link" >Shirt</Link>
									</li>
									<li className="nav-item">
										<Link to='/Juyp' className="nav-link" >Juyp</Link>
									</li>
									<li className="nav-item">
										<Link to='/TShirt' className="nav-link" >TShirt</Link>
									</li>
									<li className="nav-item">
										<Link to='/Set' className="nav-link" >Set</Link>
									</li>
						    	</ul>
					    		<ul className="navbar-nav col-sm-1">
									<li className="nav-item">
										<i className="fa fa-search" id="searchicon" onClick={this.SearchDisplay} style={{width:"auto"}}></i>
									</li>
							    	<li className="nav-item">
										<Link to="/gio-hang"><i className="fa fa-shopping-cart" id="cart"></i></Link>
										<span id="cart-number">{CartNumber}</span>
									</li>
						    	</ul>
						  	</div>
						</nav>
						<Account />
					</div>
					<div className="container modal-dialog" id="searchform">
					    <div className="modal-content">
					        <div className="modal-body">
					            <div className="searchForm">
					            	<form onSubmit={this.onSubmit}>
						                <input type="text" id="txtSearch" name="search" 
						                className="form-control formsearch" 
						                placeholder="Nhập từ khóa bạn muốn tìm kiếm, sau đó ấn Enter!" 
						                onChange={this.changeHandler}
						                />
						            </form>
					            </div>
					        </div>
					    </div>
					</div>
				</div>
		);
	}
}

export default Menu;
