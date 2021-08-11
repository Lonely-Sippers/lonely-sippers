import React from 'react';
import DetailWindow from './DetailWindow';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

const ShoppingWindow = ({ products }) => {
  let count = 0;
  return (
    <div className="">
      <h1>shop</h1>
      <hr></hr>
      <div className="lg:grid lg:grid-cols-6 ">
        {products.map((product) => {
          count++;
          return (
            <DetailWindow key={product.id} itemId={product.id} count={count} />
          );
        })}
        {/* <Scrollbars style={{ height: '40vh', width: '50%', margin: '1rem' }}>
          {products.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <div className="card border margin padding">
                <h3>{product.category}</h3>
                <h4>
                  {product.alcohol_type} from {product.region}: ${product.price}
                </h4>
              </div>
            </Link>
          ))}
        </Scrollbars>
        <Route path="/products/:id" component={DetailWindow} /> */}
      </div>
    </div>
  );
};

const mapState = ({ products }) => ({ products });

export default connect(mapState)(ShoppingWindow);
