
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
    const { orders, user } = this.props;

    console.log(orders[0].orderItems, user);
    return (

      <div className="order-list">
        {orders.map((order) => {
          const itemTotal = (order) => {
            return order.orderItems.reduce((acc, line) => {
              return (acc += line.product.price * 1);
            }, 0);
          };
          return (
            <div className="orders-container" key={order.id}>
              <div className="order-topper pt-20">
                <div>Order placed:</div>
                <div>Total</div>
                <div>Shipped to:</div>
              </div>
              <div className="order-topper">
                <div>{order.updatedAt.slice(0, -14)}</div>
                <div>{`$ ${itemTotal(order)}`}</div>
                <div>{user.firstName}</div>
              </div>
              <div className="orders-list">
                {order.orderItems.map((item) => {
                  return (
                    <div className="listItems" key={item.id}>
                      <div className="orders-listItems">
                        <img src={item.product.image_URL} />
                        <div>
                          <p> {item.product.category}</p>
                          <p> {`$ ${item.product.price}`}</p>
                          <Link to={`/products/${item.productId}`}>
                            View Product
                          </Link>
                        </div>
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
  return { orders: state.orders || [], user: state.auth };
};
const mapDispatch = (dispatch) => {
  return {
    fetchOrders(user) {
      dispatch(getOrder(user));
    },
  };
};

export default connect(mapState, mapDispatch)(Orders);
