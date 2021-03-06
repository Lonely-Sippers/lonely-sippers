import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSingleProduct, deleteProduct } from '../../store/products';

const _AdminSingleProduct = (props) => {
  const id = props.history.match.params.id * 1;

  const history = props.history;

  console.log('history in comp', history);
  const product =
    props.products.find((prod) => {
      return prod.id === id;
    }) || {};
  console.log('singleProduct', product);

  return (
    <div>
      <div className="pt-20">
        <img
          src={product.image_URL}
          alt=""
          className="mx-auto rounded-lg"
          width="10%"
        />

        <div className="px-8">
          <div className="md:flex space-x-7 py-8">
            <h3 className="font-semibold">{product.category}</h3>
            <h4>{product.alcohol_type}</h4>
          </div>

          {/* <p>{product.description}</p> */}

          <h4 className="">Country of Origin: {product.region}</h4>

          <div>
            <h4>Alcohol Percentage: {product.alcohol_percentage}</h4>
          </div>
          <h4 className="mb-16">Price: ${product.price}</h4>
          <div className="md:flex md:justify-between py-8 relative bottom-0 wider">
            <Link to={{ pathname: '/admin/product/edit' }}>
              <button className="btn transition-colors duration-300  mt-4 lg:mt-0  rounded-full text-xs font-semibold text-white uppercase py-3 px-8">
                Edit This Product
              </button>{' '}
            </Link>
            <button
              className="btn transition-colors duration-300  mt-4 lg:mt-0 lg:ml-3 rounded-full text-xs font-semibold text-white uppercase py-3 px-8"
              onClick={() => props.deleteProduct(id, history)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ products }, history) => {
  return {
    products,
    history,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('History in dispatch', history);
  return {
    getSingleProduct: (id) => dispatch(getSingleProduct(id)),
    deleteProduct: (id, history) => dispatch(deleteProduct(id, history)),
  };
};

const AdminSingleProduct = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AdminSingleProduct);

export default AdminSingleProduct;
