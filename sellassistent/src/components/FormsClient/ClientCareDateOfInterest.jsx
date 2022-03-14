import React from "react";
import { Link, useHistory } from "react-router-dom";

const ClientCareDateOfInterest = () => {
    const history = useHistory();
    return (
        <div className="container">
            <div className="container card">
                <form className="row g-3">
                    <div className="card-body">
                        <div className="col-md-6">
                            <label
                                htmlFor="clientPersonalTitle"
                                className="form-label"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="clientPersonalTitle"
                                placeholder="Title"
                            />
                        </div>
                        <div className="col-md-6">
                            <label
                                htmlFor="clientCareDoI"
                                className="form-label"
                            >
                                Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="clientCareDoI"
                            />
                        </div>
                    </div>

                    <div className="col-md-12 ">
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

                    <br />
                    <div className="col-6 mr-5 card-body">
                        <Link onClick={() => history.goBack()}>&lt;&lt;</Link>
                    </div>
                    <div className="col-6 ml-5 card-body">
                        <button type="submit" className="btn btn-primary">
                            Save info
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientCareDateOfInterest;
