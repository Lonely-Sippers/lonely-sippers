import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllUsers, changeAdminStat, fetchUser } from "../../store/admin";

class _AdminManageUsers extends React.Component {
  constructor(props) {
    super(props);
    this.toggleAdmin = this.toggleAdmin.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  componentDidUpdate() {
    this.props.fetchUser();
  }

  toggleAdmin() {
    if (user.isAdmin === true){
        this.props.updateAdmin(user.id, user.isAdmin)
    } else {
        this.props.updateAdmin(user.id, user.isAdmin)
    }
  }

  render() {
    const allUsers = this.props.state.admin.users || [];
    return (
      <div id="listUsers">
        <section className="px-5">
          <h1 className="pt-20">Users</h1>
          {allUsers.map((user) => {
            return (
              <div key={user.id} className="pt-5">
                <div>
                  <ul>
                    <li>
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
                        { user.username }
                      </Link>
                      <button onClick={()=> this.toggleAdmin(user.id)} className="px-5">
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
};

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
  mapStateToProps, mapDispatchToProps
)(_AdminManageUsers);

export default AdminManageUsers;
