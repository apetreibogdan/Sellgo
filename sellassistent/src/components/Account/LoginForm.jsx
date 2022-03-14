import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { LoginAuthAction } from "../../redux/Authentication/AuthActions";
import { Link } from "react-router-dom";
import "./modal.css";

const Login = (props) => {
    const [errorHandler, setErrorHandler] = useState({
        hasError: false,
        message: "",
    });

    const [loginState, setLoginState] = useState({});

    const history = useHistory();
    const routeChange = () => {
        let path = `home`;
        history.push(path);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Please Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form
                    className="modal-form"
                    onSubmit={(event) => {
                        event.preventDefault();
                        props.reduxlogin(loginState, history, setErrorHandler);
                        props.onHide();
                    }}
                >
                    <div className="mb-3">
                        <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={(event) => {
                                const email = event.target.value;
                                setLoginState({ ...loginState, ...{ email } });
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleInputPassword1"
                            className="form-label"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={(event) => {
                                const password = event.target.value;
                                setLoginState({
                                    ...loginState,
                                    ...{ password },
                                });
                            }}
                        />
                    </div>
                    {/* <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="exampleCheck1"
                        >
                            Check me out
                        </label>
                    </div> */}
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <div id="emailHelp" className="text-gray">
                    We will never share your email with anyone else.
                </div>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        guest: state.authRedux,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        reduxlogin: (loginState, history, setErrorHandler) =>
            dispatch(LoginAuthAction(loginState, history, setErrorHandler)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
