import React, {Component} from 'react';
import ListProduct from './ListProduct';
import './Product.css';
import './ProductRender.css';
import axios from '../AxiosServer'
class DressProduct extends Component {
	constructor(){
		super();
		this.state={
			product:[],
			TypeProduct:[],
			currentPage: 1,
          	productPerPage: 4,
		};
		this.handleClick = this.handleClick.bind(this);
	}

    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }
	async componentDidMount() {
		await axios.get('/product/get-data')
		.then(response => this.setState({product:response.data}))
	}

	Convert = () => {
		this.state.TypeProduct=[];
		this.state.product.map((good,i)=>{
			if(good.type==this.props.type)
				this.state.TypeProduct.push(good);
	})}
	render(){
		{this.Convert()};
		const { TypeProduct, currentPage, productPerPage } = this.state;

        // Logic for displaying current product
        const indexOfLastTodo = currentPage * productPerPage;
        const indexOfFirstTodo = indexOfLastTodo - productPerPage;
        const currentproduct = TypeProduct.slice(indexOfFirstTodo, indexOfLastTodo);
        const renderproduct = <ListProduct product={currentproduct}/>;

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(TypeProduct.length / productPerPage); i++) {
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

		if(!TypeProduct.length)
			return <h1>Loading</h1>
		else {
			return (
				<div className="container">
					<h2 className="Title">{this.props.type}</h2>
		              {renderproduct}
	    	        <div id="page-numbers" className="text-center page-numbers1">
            	  		{renderPageNumbers}
            		</div>
				</div>
			);
		}
	}
}

export default DressProduct;