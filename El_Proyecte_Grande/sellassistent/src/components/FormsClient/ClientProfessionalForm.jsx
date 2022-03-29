import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ClientProfessionalForm = () => {
    const history = useHistory();
    return (
        <div className="container">
            <h3>Client Professional</h3>
            <div className="container card">
                <form className="row g-3">
                    <div className="col-md-6 card-body">
                        <div className="col-md-12">
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

                        {/* <div className="col-md-12 mt-5">
                        <h3 className="ml-5">Cares</h3>
                        <button className="btn btn-info">Add Care</button>
                    </div> */}
                    </div>

                    <div className="col-md-6 card-body">
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
                            rows="23"
                            placeholder="Write here...."
                        />
                    </div>
                    <div className="col-6">
                        <Link onClick={() => history.goBack()}>&lt;&lt;</Link>
                    </div>
                    <div className="col-6">
                        <button type="submit" className="btn btn-primary">
                            Save info
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientProfessionalForm;
