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
					<p> UIT K17 </p>
					<p> Nguyễn Thanh Đức</p>
					<p className="fa fa-envelope" id="email">17521296@gm.uit.edu.vn</p>
					<div>
						<Contact />
					</div>
				</div>
				<div className="col-sm menu">
					<p className="TitleFooter">Danh mục sản phẩm</p>
					<ul className="list">
						<Link to='/Dress' className="nav-link" >Đầm</Link>
						<Link to='/Vest' className="nav-link" >vest</Link>	
						<Link to='/Shirt' className="nav-link" >Sơ mi</Link>
						<Link to='/Juyp' className="nav-link" >Juyp</Link>
						<Link to='/TShirt' className="nav-link" >Áo Phông</Link>
						<Link to='/Set' className="nav-link" >Set bộ</Link>
					</ul>
				</div>
			</div>
		);
	}
}

export default Footer;