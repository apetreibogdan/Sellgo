import React, { Fragment, useState, useEffect } from "react";
import Layout from "./components/layout/Layout";

import { useSelector } from "react-redux";
import Home from "./components/layout/Home";

import "./App.css";

const App = () => {
    const guest = useSelector((state) => state.authRedux);

    const [user, setUser] = useState({ id: "", name: "", email: "" });

    const [pageShow, setPageShow] = useState(<Home />);

    useEffect(() => {
        setUser({
            id: guest.user.id,
            name: guest.user.name,
            email: guest.user.name,
        });

        user.email !== ""
            ? setPageShow(<Layout userName={user} />)
            : setPageShow(<Home />);
    }, [guest]);
    return <Fragment>{pageShow}</Fragment>;
};

export default App;
