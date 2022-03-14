import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modaltest.css";

const Modaltest = (props) => {
    
    const closeOnEscapeKeyDown = (e) => {
        if ((e.charCode || e.keyCode) === 27) {
            props.onClose();
        }
    };

    useEffect(() => {
        document.body.addEventListener("keydown", closeOnEscapeKeyDown);
        return function cleanup() {
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
    }, []);

    return ReactDOM.createPortal(
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}
        >
            <div className="modaltest" onClick={props.onClose}>
                <div
                    className="modaltest-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modaltest-header">
                        <h4 className="modaltest-title">{props.title}</h4>
                    </div>
                    <div className="modaltest-body">{props.children}</div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById("root")
    );
};

export default Modaltest;
