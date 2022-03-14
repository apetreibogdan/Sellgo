import { useSelector } from "react-redux";
import React, { useState } from "react";
import UserContainer from "../components/Data/UserContainer";
import ClientForm from "../components/FormsClient/ClientForm";

const Users = () => {
    let user = useSelector((state) => state.authRedux).user;
    return user.role === "Admin" ? (
        <div>
            <UserContainer />
        </div>
    ) : (
        <div>ACCES DENIED</div>
    );
};

export default Users;
