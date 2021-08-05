import React from 'react';
import DetailWindow from './DetailWindow';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

const ShoppingWindow = ({ products }) => {
  console.log(products);
  return (
    <div className="border padding twoThird maxHeight">
      <h1>shop</h1>
      <hr></hr>
      <div className="flex">
        <Scrollbars style={{ height: '40vh', width: '50%', marginTop: '1rem' }}>
          {products.map((product) => (
            <div className="border margin padding" key={product.id}>
              <h3>{product.category}</h3>
              <h4>
                {product.type} from {product.region}: ${product.price}
              </h4>
            </div>
          ))}
        </Scrollbars>

        <DetailWindow />
      </div>
    </div>
  );
};

const mapState = (state) => ({ products: state.products });

export default connect(mapState)(ShoppingWindow);
