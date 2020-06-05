import React, {Component} from 'react';
import Menu from '../../Menu/Menu';
import ProductRender from '../../Product/ProductRender';
import Footer from '../../Footer/Footer';
class Dress extends Component {
  render(){
  return (
    <div className="Dress">
      <header className="App-header">
        <Menu className='Menu' />
      </header>
      <div className="Product">
        <div className="NewProduct">
          <ProductRender type={"juyp"} />
        </div>
      </div>
      <Footer />
    </div>
    );
  }
}

export default Dress;