import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { RegisterAuthAction } from "../../redux/Authentication/AuthActions";
import {
    faCheck,
    faTimes,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./modal.css";

const FIRSTNAME_REGEX = /^(?=^[^-'\n]*[-']{0,1}[^-'\n]*$)^[A-Z][-'\w ]{2,10}$/;

const LASTNAME_REGEX = /^(?=^[^-'\n]*[-']{0,1}[^-'\n]*$)^[A-Z][-'\w ]{2,10}$/;

const PASSWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const RegisterForm = (props) => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const errRef = useRef();

    const [firstNameTest, setFirstNameTest] = useState("");
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastNameTest, setLastNameTest] = useState("");
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [emailTest, setEmailTest] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [passwdTest, setPasswdTest] = useState("");
    const [validPasswd, setValidPasswd] = useState(false);
    const [passwdFocus, setPasswdFocus] = useState(false);

    const [matchPasswd, setMatchPasswd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const { user, register } = props;
    const [userState, setUserstate] = useState({});
    const history = useHistory();
    const [errorHandler, setErrorHandler] = useState({
        hasError: false,
        message: "",
    });

    // useEffect(() => {
    //     firstNameRef.current.focus();
    // }, []);

    useEffect(() => {
        const result = FIRSTNAME_REGEX.test(firstNameTest);
        console.log(result);
        console.log(firstNameTest);
        setValidFirstName(result);
    }, [firstNameTest]);

    useEffect(() => {
        const result = LASTNAME_REGEX.test(lastNameTest);
        console.log(result);
        console.log(lastNameTest);
        setValidLastName(result);
    }, [lastNameTest]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(emailTest);
        console.log(result);
        console.log(emailTest);
        setValidEmail(result);
    }, [emailTest]);

    useEffect(() => {
        const result = PASSWD_REGEX.test(passwdTest);
        console.log(result);
        console.log(passwdTest);
        setValidPasswd(result);
        const matchCheck = passwdTest === matchPasswd;
        setValidMatch(matchCheck);
    }, [passwdTest, matchPasswd]);

    useEffect(() => {
        setErrMsg("");
    }, [firstNameTest, lastNameTest, passwdTest, matchPasswd]);

    const routeChange = () => {
        window.location.reload();
    };

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Register Form
                        <section>
                            <p
                                ref={errRef}
                                className={
                                    errMsg ? "alert alert-danger" : "d-none"
                                }
                                aria-live="assertive"
                            >
                                {errMsg}
                            </p>
                        </section>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="my-modal">
                    <form
                        action=""
                        className="modal-form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            register(userState, setErrorHandler);
                            routeChange();
                        }}
                    >
                        <div className="mb-3 col-md-6">
                            <label>
                                First Name
                                <span
                                    className={
                                        validFirstName
                                            ? "text-success"
                                            : "d-none"
                                    }
                                >
                                    {" "}
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span
                                    className={
                                        validFirstName || !firstNameTest
                                            ? "d-none"
                                            : "text-danger"
                                    }
                                >
                                    {" "}
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                ref={firstNameRef}
                                autoComplete="off"
                                className="form-control"
                                placeholder="Enter First Name"
                                onChange={(event) => {
                                    const firstName = event.target.value;
                                    setFirstNameTest(firstName);
                                    setUserstate({
                                        ...userState,
                                        ...{ firstName },
                                    });
                                }}
                                required
                                aria-invalid={validFirstName ? true : false}
                                aria-describedby="firstNameIdNote"
                                onFocus={() => setFirstNameFocus(true)}
                                onBlur={() => setFirstNameFocus(false)}
                            />
                            <p
                                id="firstNameIdNote"
                                className={
                                    firstNameFocus &&
                                    firstNameTest &&
                                    !validFirstName
                                        ? "text-info bg-dark p-3"
                                        : "d-none "
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                <br /> first letter Capitalize
                                <br /> minimum two letters
                                <br /> apostrophe and hyphen are allowed
                            </p>
                        </div>

                        <div className="mb-3 col-md-6">
                            <label>
                                Last Name
                                <span
                                    className={
                                        validLastName
                                            ? "text-success"
                                            : "d-none"
                                    }
                                >
                                    {" "}
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span
                                    className={
                                        validLastName || !lastNameTest
                                            ? "d-none"
                                            : "text-danger"
                                    }
                                >
                                    {" "}
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                ref={lastNameRef}
                                autoComplete="off"
                                className="form-control"
                                placeholder="Enter Last Name"
                                onChange={(event) => {
                                    const lastName = event.target.value;
                                    setLastNameTest(lastName);
                                    setUserstate({
                                        ...userState,
                                        ...{ lastName },
                                    });
                                }}
                                required
                                aria-invalid={validLastName ? true : false}
                                aria-describedby="lastNameIdNote"
                                onFocus={() => setLastNameFocus(true)}
                                onBlur={() => setLastNameFocus(false)}
                            />
                            <p
                                id="lastNameIdNote"
                                className={
                                    lastNameFocus &&
                                    lastNameTest &&
                                    !validLastName
                                        ? "text-info bg-dark p-3"
                                        : "d-none "
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                <br /> first letter Capitalize
                                <br /> minimum two letters
                                <br /> apostrophe and hyphen are allowed
                            </p>
                        </div>

                        <div className="mb-3 col-md-12">
                            <label>
                                Email
                                <span
                                    className={
                                        validEmail ? "text-success" : "d-none"
                                    }
                                >
                                    {" "}
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span
                                    className={
                                        validEmail || !emailTest
                                            ? "d-none"
                                            : "text-danger"
                                    }
                                >
                                    {" "}
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                ref={emailRef}
                                autoComplete="off"
                                className="form-control"
                                placeholder="Enter Email"
                                onChange={(event) => {
                                    const email = event.target.value;
                                    setEmailTest(email);
                                    setUserstate({
                                        ...userState,
                                        ...{ email },
                                    });
                                }}
                                required
                                aria-invalid={validEmail ? true : false}
                                aria-describedby="emailIdNote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <p
                                id="emailIdNote"
                                className={
                                    emailFocus && emailTest && !validEmail
                                        ? "text-info bg-dark p-3"
                                        : "d-none "
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                <br />
                                enter your correct email
                            </p>
                        </div>
                        <div className="mb-3 col-md-12">
                            <label>
                                Password
                                <span
                                    className={
                                        validPasswd ? "text-success" : "d-none"
                                    }
                                >
                                    {" "}
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span
                                    className={
                                        validPasswd || !passwdTest
                                            ? "d-none"
                                            : "text-danger"
                                    }
                                >
                                    {" "}
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter Password"
                                onChange={(event) => {
                                    const password = event.target.value;
                                    setPasswdTest(password);
                                    setUserstate({
                                        ...userState,
                                        ...{ password },
                                    });
                                }}
                                required
                                aria-invalid={validPasswd ? "false" : "true"}
                                aria-describedby="paswordIdNote"
                                onFocus={() => setPasswdFocus(true)}
                                onBlur={() => setPasswdFocus(false)}
                            />
                            <p
                                id="paswordIdNote"
                                className={
                                    passwdFocus && passwdTest && !validPasswd
                                        ? "text-info bg-dark p-3"
                                        : "d-none "
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                <br /> 8 - 10 characters
                                <br /> uppercase letter
                                <br /> lowercase letter
                                <br /> number
                                <br /> special character
                            </p>
                        </div>
                        <div className="mb-3 col-md-12">
                            <label htmlFor="confirmPassword">
                                Confirm Password
                                <span
                                    className={
                                        validMatch && matchPasswd
                                            ? "text-success"
                                            : "d-none"
                                    }
                                >
                                    {" "}
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span
                                    className={
                                        validMatch || !matchPasswd
                                            ? "d-none"
                                            : "text-danger"
                                    }
                                >
                                    {" "}
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="form-control"
                                placeholder="Confirm Password"
                                onChange={(event) => {
                                    const confirmPassword = event.target.value;
                                    setMatchPasswd(confirmPassword);
                                    setUserstate({
                                        ...userState,
                                        ...{ confirmPassword, companyId: 1 },
                                    });
                                }}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmIdNote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p
                                id="confirmIdNote"
                                className={
                                    matchFocus && !validMatch
                                        ? "text-info bg-dark p-3"
                                        : "d-none "
                                }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                <br /> Must match the first password
                            </p>
                        </div>
                        <div className="col-md-12">
                            <button
                                className="btn btn-primary"
                                disabled={
                                    !validFirstName ||
                                    !validLastName ||
                                    !validEmail ||
                                    !validPasswd ||
                                    !validMatch
                                        ? true
                                        : false
                                }
                            >
                                Signup Now
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <p className="text-gray">
                        If you have an account, Please{" "}
                        <a
                            className="btn-link text-white text-decoration-none"
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                props.openLogin();
                                props.onHide();
                            }}
                        >
                            Login Now
                        </a>
                    </p>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.authRedux,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: (userState, history, setErrorHandler) =>
            dispatch(RegisterAuthAction(userState, history, setErrorHandler)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
