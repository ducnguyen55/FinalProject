import React, {Component} from 'react'
import './Admin.css'
import ListProductAdmin from './Product/ListProductAdmin'
import SearchBox from './SearchBox'
import {Link} from 'react-router-dom'
import axios from '../AxiosServer'
import jwt_decode from 'jwt-decode'
class Admin extends Component {
	constructor(){
		super();
		this.state={
			products:[],
			searchfield:'',
			currentPage: 1,
          	productPerPage: 12
		};
		this.handleClick = this.handleClick.bind(this);
	}

    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
    }
    onSearchChange = (event) => {
    	this.setState({searchfield: event.target.value});
    }
	async componentDidMount() {
		await axios.get('/product/get-data')
		.then(response => this.setState({products:response.data}));
	}
	CheckLogin = () =>{
		if(localStorage.length!=0)
		{
			const token = localStorage.usertoken;
			const decoded =jwt_decode(token);
			if(decoded.role!='admin')
				this.props.history.push('/');
		}
	};
	render() {
		{this.CheckLogin()};
		//Search Product
		 const filteredProduct = this.state.products.filter(product => {
    		return product.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    	})

		//Render Pagination
		const {products, currentPage, productPerPage} = this.state;
        const indexOfLastTodo = currentPage * productPerPage;
        const indexOfFirstTodo = indexOfLastTodo - productPerPage;
        const currentproduct = filteredProduct.slice(indexOfFirstTodo, indexOfLastTodo);
        const renderproduct = <ListProductAdmin product={currentproduct}/>;

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredProduct.length / productPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
          );
        });
		if(!products.length)
			return <h1>Loading</h1>
		else{
			return (
				<div className="container">
					<li className="nav_item homebutton">
						<Link to="/">Back</Link>
					</li>
					<div className="Titile">
						<h2>Admin Page</h2>
					</div>
					<div className="col-sm-12 searchproduct">
						<div className="col-sm-12 menuAdmin">
							<div className="product-info">
								<div className="col-sm-9 search">
									<section id="search">
										<label for="search-input">
											<i class="fa fa-search" aria-hidden="true"></i>
											<span class="search-only"></span>
										</label>
										<SearchBox searchChange={this.onSearchChange}/>
									</section>
								</div>
								<div className="col-sm-3 addproduct">
									<Link to="/admin/addproduct" className="addbtn btn"><i class="addicon fa fa-plus" aria-hidden="true"></i></Link>
								</div>
							</div> 
						</div>
						<div className="productAdmin">
		                	{renderproduct}
						</div>
			            <ul id="page-numbers">
		              		{renderPageNumbers}
		            	</ul>
					</div>
				</div>
			);
		}
	}
}

export default Admin;