import React, {Component} from 'react';
import './Footer.css';
import {Link} from 'react-router-dom';
import Contact from '../Contact/Contact';

class Footer extends Component {
	render(){
		return (
			<div className="container footer row mx-auto d-block">
				<div className="col-sm info">
					<p className="TitleFooter">Thông tin liên hệ</p>
					<p> Thời trang cho phái nữ</p>
					<p> UIT K12 </p>
					<p> Nguyễn Thanh Đức</p>
					<p> Nguyễn Quốc Đại </p>
					<p className="fa fa-envelope" id="email">17521296@gm.uit.edu.vn</p>
					<br></br>
					<p className="fa fa-envelope" id="email">17521294@gm.uit.edu.vn</p>
					<div>
						<Contact />
					</div>
				</div>
				<div className="col-sm menu">
					<p className="TitleFooter">product portfolio</p>
					<ul className="list">
						<Link to='/Dress' className="nav-link" >Dress</Link>
						<Link to='/Vest' className="nav-link" >Vest</Link>	
						<Link to='/Shirt' className="nav-link" >Shirt</Link>
						<Link to='/Juyp' className="nav-link" >Juyp</Link>
						<Link to='/TShirt' className="nav-link" >TShirt</Link>
						<Link to='/Set' className="nav-link" >Set</Link>
					</ul>
				</div>
			</div>
		);
	}
}

export default Footer;