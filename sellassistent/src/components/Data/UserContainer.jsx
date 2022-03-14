import React, { useEffect } from "react";
//import { useSelector, useDispatch } from 'react-redux'
import { connect } from "react-redux";
import { fetchUsers } from "../../redux/Users/UserActions";

import { useSelector } from "react-redux";
import { fetchDeals } from "../../redux/Deals/DealActions";

function UsersContainer({ userdata, fetchUsers }) {
    useEffect(() => {
        fetchUsers();
    }, []);
    console.log(userdata);

    return userdata.loading ? (
        <h2>Loading</h2>
    ) : userdata.error ? (
        <h2>{userdata.error}</h2>
    ) : (
        <div>
            <h2>Users List</h2>
            <div>
                {userdata.users.map((user, index) => (
                    <p key={index}>{user.firstName}</p>
                ))}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userdata: state.userRedux,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
