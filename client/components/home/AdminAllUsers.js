import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllUsers, changeAdminStat } from '../../store/admin';

class _AdminManageUsers extends React.Component {
  async componentDidMount() {
    await this.props.fetchAllUsers();
  }
  render() {
    const allUsers = this.props.state.admin.users || [];

    return (
      <div id="listUsers">
        <section>
          <h1 className="pt-20">Users</h1>
          {allUsers.map((user) => {
            return (
              <div key={user.id}>
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
                        {user.username}
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
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
  };
};

const AdminManageUsers = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AdminManageUsers);

export default AdminManageUsers;
