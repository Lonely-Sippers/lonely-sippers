import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrder } from "../../store/orders";
import { Link } from "react-router-dom";

class Orders extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const { user } = this.props;
    console.log(this.props.match);
  }

  render() {
    const { user, orders } = this.props;

    console.log(orders[0], user);
    return (
      <div className="order-list">
        {orders.map((order) => {
          console.log(order);
          const itemTotal = (order) => {
            return order.orderItems.reduce((acc, line) => {
              return (acc += line.product.price * 1);
            }, 0);
          };
          return (
            <div className="orders-container " key={order.id}>
              <div className="order-topper-container">
                <div className="order-topper pt-20">
                  <div>Order placed:</div>
                  <div>Total</div>
                  <div>Shipped to:</div>
                </div>
                <div className="order-topper pt-20">
                  <div>{order.createdAt.slice(0, -14)}</div>
                  <div>{`$ ${itemTotal(order)}`}</div>
                  <div>{user.firstName}</div>
                </div>
              </div>
              <div className="orders-list">
                {order.orderItems.map((item) => {
                  return (
                    <div
                      className="card flexy justify-between m-4 relative"
                      key={item.id}
                    >
                      <div className>
                        <img src={item.product.image_URL} width="20%" />
                      </div>
                      <div>
                        <p> {item.product.category}</p>
                        <p> {`$ ${item.product.price}`}</p>
                      </div>
                      <div>
                        <Link to={`/products/${item.productId}`}>
                          <button className="btn transition-colors duration-300  mt-4 lg:mt-0  rounded-full text-xs font-semibold text-white uppercase py-3 px-6 mb-12">
                            View Product
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return { orders: state.orders || [], user: state.auth || {} };
};
const mapDispatch = (dispatch) => {
  return {
    fetchOrders(user) {
      dispatch(getOrder(user));
    },
  };
};

export default connect(mapState, mapDispatch)(Orders);
