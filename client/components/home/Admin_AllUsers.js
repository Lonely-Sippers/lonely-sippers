
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllUsers, changeAdminStat, fetchUser } from "../../store/admin";

class _AdminManageUsers extends React.Component {
    constructor(props) {
        super(props);
        this.toggleAdmin = this.toggleAdmin.bind(this);
      }

  async componentDidMount() {
    await this.props.fetchAllUsers();

  }

//   componentDidUpdate() {
//     this.props.fetchUser();
//   }

  toggleAdmin() {
    let user = this.props.state;
    console.log("fetched user", user);  
    this.props.updateAdmin(user.id, !user.isAdmin)
  }

  render() {
    const allUsers = this.props.state.admin.users || [];

    return (
      <div id="listUsers">
        <section className="px-5">
          <h1 className="pt-20">Users</h1>
          {allUsers.map((user) => {
            return (
              <div key={user.id}>
                <div>
                  <ul>
                    <li className="space-x-3">
                      <Link
                        to={{
                          pathname: `/admin/users/${user.id}`,
                          query: { userId: user.id },
                        }}
                      >
                        <img src={user.userImage} />
                      </Link>
                      <Link
                        to={{
                          pathname: `/admin/users/${user.id}`,
                          query: { userId: user.id },
                        }}
                      >
                        {user.username}
                      </Link>
                      <button onClick={()=> this.toggleAdmin(user.id)} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-1 border border-gray-400 rounded shadow">
                          Toggle Admin Status
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),

    fetchUser: () => dispatch(fetchUser()),
    updateAdmin: (id, isAdmin) => dispatch(changeAdminStat(id, isAdmin))
  }

};

const AdminManageUsers = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AdminManageUsers);

export default AdminManageUsers;
