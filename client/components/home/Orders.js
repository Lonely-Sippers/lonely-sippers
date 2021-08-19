import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrder } from "../../store/orders";

class Orders extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const { user } = this.props;
    console.log(this.props.match);
    //await this.props.fetchOrders(user.id);
  }

  render() {
    const { orders, user } = this.props;
    const orderItems = orders.orderItems || [];
    console.log(orderItems, user);
    return (
      <div className="orders-container">
        <div className="order-topper">
          <div>Order placed:</div>
          <div>Total</div>
          <div>Shipped to:</div>
        </div>
        <div className="order-topper">
          <div>Today</div>
          <div>Number</div>
          <div>{user.firstName}</div>
        </div>
        <div className="order-list">
          {orderItems.map((order) => {
            return <div> yes </div>;
          })}
        </div>
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
