import React from "react";
import "./dealBoard.css";

const HeadBoard = () => {
    return (
        <div className="container paddingHeader">
            <div className="row">
                <div className="col headpill"> Clients </div>
                <div className="col headpill">Company</div>
                <div className="col headpill"> Deal status</div>
                <div className="col headpill">Interception</div>
                <div className="col headpill"> Priority</div>
                <div className="col headpill">Deal size</div>
                <div className="col headpill">Products</div>
            </div>
        </div>
    );
};

export default HeadBoard;
