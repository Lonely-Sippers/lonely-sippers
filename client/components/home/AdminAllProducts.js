import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { fetchAllProducts, changeAdminStat } from '../../store/admin';

const _AdminManageProducts = ({ props }) => {
  console.log("props", props);
  return (
    <div id="listProducts">
      <section>
        <h1>Products</h1>
        {props.products.map((product) => {
          console.log("propsdotproducts", props.products);

          return (
            <div key={product.id} className="card">
              <div className="product-card">
                <ul>
                  <li>
                    <Link
                      to={{
                        pathname: `/products/${product.id}`,
                        query: { productId: product.id },
                      }}
                    >
                      <img src={product.image_URL} />
                    </Link>
                    <Link
                      to={{
                        pathname: `/products/${product.id}`,
                        query: { productId: product.id },
                      }}
                    >
                      {product.name}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

const mapState = ({ products }) => {
  return {
    products
  };
};

const AdminManageProducts = connect(mapState)(_AdminManageProducts);

export default AdminManageProducts;
