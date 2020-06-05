import React, {Component} from 'react';
import './Homepage.css';
import Menu from '../../Menu/Menu';
import Background from './Background';
import NewProduct from './NewProduct';
import SaleProduct from './SaleProduct';
import Footer from '../../Footer/Footer';

class Homepage extends Component {
  render(){
  return (
    <div className="Home">
      <header className="App-header">
        <Menu className='Menu' />
      </header>
      <Background className="Background"/>
      <div className="Product">
        <div className="NewProduct">
          <NewProduct />
        </div>
        <div className="SaleProduct">
          <SaleProduct />
        </div>
      </div>
      <Footer />
    </div>
    );
  }
}

export default Homepage;