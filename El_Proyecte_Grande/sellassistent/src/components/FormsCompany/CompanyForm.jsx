import { ENDPOINTS } from "../../api/Index";
import React, { useState, useEffect } from "react";

const CompanyForm = () => {
    const [name, setName] = useState("No Company"); //done
    const [cui, setCui] = useState("00000000"); // done
    const [email, setEmail] = useState("x@x.com"); //done
    const [address, setAddress] = useState("No Address"); //done
    const [company, setCompany] = useState({ name, cui, email, address }); // done

    useEffect(() => {
        setCompany({ name, cui, email, address });
    }, [name, cui, email, address]);

    const addCompany = async (company) => {
        console.log(company);
        await fetch(`${ENDPOINTS.BASE_URL}${ENDPOINTS.COMPANY}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(company),
        });
        window.location.replace("/");
    };

    return (
        <div className="container">
            <h3>Add Company</h3>
            <div className="container card">
                <form
                    className="row g-3"
                    onSubmit={(event) => {
                        event.preventDefault();

                        addCompany(company);
                    }}
                >
                    <div className="col-md-6">
                        <label htmlFor="companyName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="companyName"
                            placeholder="AiG S.A."
                            onChange={(event) => {
                                event.preventDefault();
                                const companyName = event.target.value;
                                setName(companyName);
                                setCompany({ name, cui, email, address });
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="companyCUI" className="form-label">
                            CUI
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="companyCUI"
                            placeholder="742105"
                            onChange={(event) => {
                                event.preventDefault();
                                const companyCUI = event.target.value;
                                setCui(companyCUI);
                                setCompany({ name, cui, email, address });
                            }}
                        />
                    </div>

                    <div className="col-6">
                        <label htmlFor="companyEmail" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="companyEmail"
                            placeholder="contact@exemple.com"
                            onChange={(event) => {
                                event.preventDefault();
                                const companyEmail = event.target.value;
                                setEmail(companyEmail);
                                setCompany({ name, cui, email, address });
                            }}
                        />
                    </div>

                    <div className="col-3">
                        <label htmlFor="companyAddress" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="companyAddress"
                            placeholder="Bucharest str Maica Domnului nr 11"
                            onChange={(event) => {
                                event.preventDefault();
                                const companyAddress = event.target.value;
                                setAddress(companyAddress);
                                setCompany({ name, cui, email, address });
                            }}
                        />
                    </div>

                    <br />
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            Save all info
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanyForm;
