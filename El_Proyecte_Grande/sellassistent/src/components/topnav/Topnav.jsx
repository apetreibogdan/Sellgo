import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import Modaltest from "../modal/Modaltest";
import { ENDPOINTS } from "../../api/Index";

import { LogOutAuthAction } from "../../redux/Authentication/AuthActions";
import notifications from "../../assets/JsonData/notification.json";
import user_image from "../../assets/images/profile2.jpg";
import user_menu from "../../assets/JsonData/user_menus.json";

import Dropdown from "../dropdown/Dropdown";
import ThemeMenu from "../thememenu/ThemeMenu";
import "./topnav.css";
import ColorSettings from "../colorSettings/ColorSettings";

const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
);

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user_image} alt="avatar" />
        </div>
        <div className="topnav__right-user__name">{user.display_name}</div>
    </div>
);

// const renderUserMenu = (item, index) => (
//     <Link to="" key={index}>
//         <div className="notification-item">
//             <i className={item.icon}></i>
//             <span>{item.content}</span>
//         </div>
//     </Link>
// );

const Topnav = (props) => {
    const userId = useSelector((state) => state.authRedux).user.id;
    const [user, setUser] = useState();
    useEffect(() => {
        // axios
        axios.get(`${ENDPOINTS.BASE_URL}${ENDPOINTS.USER}${userId}`).then(
            (response) => {
                setUser(response.data);
                console.log(user);
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);
    const [show, setShow] = useState(false);
    const renderUserMenu = (item, index) => (
        <a
            key={index}
            onClick={
                item.content === "Settings"
                    ? () => setShow(true)
                    : item.content === "Logout"
                    ? () => routeChange()
                    : item.content === "Profile"
                    ? () => routeChangeToProfile()
                    : {}
            }
        >
            <div className="notification-item">
                <i className={item.icon}></i>
                <span>{item.content}</span>
            </div>
        </a>
    );

    const history = useHistory();
    const guest = useSelector((state) => state.authRedux);
    const curr_user = {
        display_name: user?.firstName + " " + user?.lastName,
        image: user_image,
    };

    // const mainColor = { backgroundColor: "var(--main-color)" };
    const routeChangeToProfile = () => {
        window.location.replace(`/profile`);
    };
    const routeChange = () => {
        props.logout(history);
        window.location.reload();
    };

    return (
        <div className="topnav">
            <div>
                <Modaltest
                    title="Chose Color"
                    onClose={() => setShow(false)}
                    show={show}
                >
                    <div className="my-center">
                        <ColorSettings />
                    </div>
                </Modaltest>
            </div>

            <div className="topnav__right">
                <div className="topnav__right-item">
                    {guest.user.name !== "" || guest.user.name !== null ? (
                        <div>
                            <button
                                href="#"
                                className="btn"
                                onClick={() => {
                                    props.logout(history);
                                    routeChange();
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="topnav__right-item">
                    {/* Dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(curr_user)}
                        contentData={user_menu}
                        renderItems={(item, index) =>
                            renderUserMenu(item, index)
                        }
                    />
                </div>
                <div className="topnav__right-item">
                    <Dropdown
                        icon="bx bx-bell"
                        badge="12"
                        contentData={notifications}
                        renderItems={(item, index) =>
                            renderNotificationItem(item, index)
                        }
                        renderFooter={() => <Link to="/">View All</Link>}
                    />
                    {/* Dropdown here */}
                </div>
                <div className="topnav__right-item">
                    <ThemeMenu />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.authRedux,
    };
};

//   const mapDispatchToProps = dispatch => {
//     return {
//       register: (userState, history, setErrorHandler) => dispatch(RegisterAuthAction(userState, history, setErrorHandler)),
//     };
//   };

//   const mapDispatchToProps = dispatch => {
//     return {
//       login: (loginState, history, setErrorHandler) => dispatch(LoginAuthAction(loginState, history, setErrorHandler)),
//     }
//   }

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (history) => {
            dispatch(LogOutAuthAction(history));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topnav);
