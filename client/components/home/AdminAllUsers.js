import React from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../store/admin';

const _AdminManageUsers = () => {

    return (
        <div />
    );
};

const mapState = () => {

}

const AdminManageUsers = connect(mapState)(_AdminManageUsers);

export default AdminManageUsers;