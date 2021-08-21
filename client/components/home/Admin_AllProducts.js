import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../store/products";

class _AdminManageProducts extends React.Component {
  async componentDidMount() {
    console.log("mounting products");
    await this.props.getProducts();
  }

  render() {
    const allProducts = this.props.products || [];
    return (
      <div id="listProducts" className="px-3 container mx-auto">
        <h1 className="pt-20 px-3">Products</h1>
        <div className="pt-3">
          <Link to={{ pathname: "/admin/product/add" }}>
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              Add A New Product
            </button>
          </Link>
        </div>
        <div className="lg:grid lg:grid-cols-6 mt-3 pt-3 px-3 py-3">
          {allProducts.map((product) => {
            return (
              <div key={product.id}>
                <div>
                  <ul>
                    <li>
                      <Link
                        to={{
                          pathname: `/admin/products/${product.id}`,
                          query: { productId: product.id },
                        }}
                      >
                        <img src={product.image_URL} />
                      </Link>
                      <Link
                        to={{
                          pathname: `/admin/products/${product.id}`,
                          query: { productId: product.id },
                        }}
                      >
                        {product.category}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
  };
};

const AdminManageProducts = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AdminManageProducts);

export default AdminManageProducts;
