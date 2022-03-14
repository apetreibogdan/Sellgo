import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ClientCareForm = () => {
    const history = useHistory();
    return (
        <div className="container">
            <h3>add Care</h3>
            <div className="container card">
                <form className="row g-3 ">
                    <div className="col-md-6">
                        <label htmlFor="clientFirstName" className="form-label">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="clientFirstName"
                            placeholder="unknown"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="clientLastName" className="form-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="clientLastName"
                            placeholder="unknown"
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="clientGender" className="form-label">
                            Gender
                        </label>
                        <select id="clientGender" className="form-select">
                            <option selected>Choose...</option>
                            <option> self</option>
                            <option> Daughter</option>
                            <option> Son</option>
                            <option>LivePartner</option>
                            <option> Dog</option>
                            <option> Cat</option>
                            <option>Aquarium</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label
                            htmlFor="clientPersonalDetail"
                            className="form-label"
                        >
                            Details
                        </label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="clientPersonalDetail"
                            rows="7"
                            placeholder="Write here...."
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="clientDoB" className="form-label">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="clientDoB"
                        />
                    </div>
                    <div className="col-6">
                        <h5>Date of interest</h5>
                        <Link to="/clientcaredateofinterestform">
                            <button className="btn btn-info">Add Date</button>
                        </Link>
                    </div>

                    <br />
                    <div className="col-6">
                        <Link onClick={() => history.goBack()}>&lt;&lt;</Link>
                    </div>
                    <div className="col-6">
                        <button type="submit" className="btn btn-primary">
                            Save all info
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientCareForm;
