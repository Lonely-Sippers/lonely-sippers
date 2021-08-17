import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllUsers, changeAdminStat } from "../../store/admin";

class _AdminManageUsers extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log("thisdotprops", this.props);

//     console.log("thisdotpropsdotstate", this.props.state.admin);
//   }

//   componentDidMount() {
//     this.props.fetchAllUsers();
//   }
  render() {
    // console.log("thisdotprops", this.props);
    // const allUsers = this.props.state.admin.users || [];
    // console.log("fetched", allUsers);
    return (
        <h1>Users</h1>
    )
    // //   <div id="listUsers">
    // //     <section>
    //       <h1>Users</h1>
    //       {/* {allUsers.map((user) => {
    //         return (
    //           <div key={user.id} className="card">
    //             <div className="user-card">
    //               <ul>
    //                 <li>
    //                   <Link
    //                     to={{
    //                       pathname: `/users/${user.id}`,
    //                       query: { userId: user.id },
    //                     }}
    //                   >
    //                     <img src={user.userImage} />
    //                   </Link>
    //                   <Link
    //                     to={{
    //                       pathname: `/users/${user.id}`,
    //                       query: { userId: user.id },
    //                     }}
    //                   >
    //                     {user.firstName} + {user.lasName}
    //                   </Link>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //         );
    //       })} */}
    // //     </section>
    // //   </div>
    // );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers())
  }
};

const AdminManageUsers = connect(
  mapStateToProps
)(_AdminManageUsers);

export default AdminManageUsers;
