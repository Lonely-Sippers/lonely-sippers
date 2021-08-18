import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSingleProduct } from "../../store/products";

class _AdminSingleProduct extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          product: {}
      };
    }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getSingleProduct(id);
  }

  render() {
    const product = this.props.product.products || {};
    console.log("singleProduct", product);

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
            <div className="md:flex md:justify-between py-8 absolute bottom-0 wider">
              <button className="btn transition-colors duration-300  mt-4 lg:mt-0  rounded-full text-xs font-semibold text-white uppercase py-3 px-8">
                Edit This Product
              </button>
              <button
                className="btn transition-colors duration-300  mt-4 lg:mt-0 lg:ml-3 rounded-full text-xs font-semibold text-white uppercase py-3 px-8"
                onClick={() => {}}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (product = {}) => ({
  product,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (id) => dispatch(getSingleProduct(id)),
  };
};

const AdminSingleProduct = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AdminSingleProduct);

export default AdminSingleProduct;
