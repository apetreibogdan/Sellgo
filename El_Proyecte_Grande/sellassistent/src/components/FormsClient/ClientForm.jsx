import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ENDPOINTS } from "../../api/Index";

const ClientForm = () => {
    let companies = useSelector((state) => state.companiesRedux).companies;
    const genders = [
        { value: 0, label: "Female" },
        { value: 1, label: "Male" },
        { value: 2, label: "Unknown" },
    ];
    const [firstName, setFirstName] = useState("John"); //done
    const [lastName, setLastName] = useState("Doe"); //done
    const [companyId, setCompanyId] = useState(1); //done
    const [email, setEmail] = useState("contact@exemple.com"); //done
    const [phoneNumber, setPhoneNumber] = useState("+40712123123"); //done
    const [dateOfBirth, setDateOfBirth] = useState("1900-01-01"); //done
    const [position, setPosition] = useState("Unknouwn"); //done
    const [gender, setGender] = useState(2);
    const [address, setAddress] = useState(
        "Bucharest str Maica Domnului nr 11"
    ); //done
    const [client, setClient] = useState({
        firstName,
        lastName,
        email,
        phoneNumber,
        companyId,
        dateOfBirth,
        position,
        gender,
        address,
    }); // done

    useEffect(() => {
        setClient({
            firstName,
            lastName,
            email,
            phoneNumber,
            companyId,
            dateOfBirth,
            position,
            gender,
            address,
        });
    }, [
        firstName,
        lastName,
        email,
        phoneNumber,
        companyId,
        dateOfBirth,
        position,
        gender,
        address,
    ]);

    const addClient = async (client) => {
        console.log(client);
        await fetch(`${ENDPOINTS.BASE_URL}${ENDPOINTS.CLIENT}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(client),
        });
        window.location.replace("/");
    };

    return (
        <div className="container">
            <h3>Add Client</h3>
            <div className="container card">
                <form
                    className="row g-3"
                    onSubmit={(event) => {
                        event.preventDefault();

                        addClient(client);
                    }}
                >
                    <div className="col-md-6">
                        <label htmlFor="clientFirstName" className="form-label">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="clientFirstName"
                            placeholder="John"
                            onChange={(event) => {
                                event.preventDefault();
                                const clientFirstName = event.target.value;
                                setFirstName(clientFirstName);
                                setClient({
                                    firstName,
                                    lastName,
                                    email,
                                    phoneNumber,
                                    companyId,
                                    dateOfBirth,
                                    position,
                                    gender,
                                    address,
                                });
                            }}
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
                            placeholder="Doe"
                            onChange={(event) => {
                                event.preventDefault();
                                const clientLastName = event.target.value;
                                setLastName(clientLastName);
                                setClient({
                                    firstName,
                                    lastName,
                                    email,
                                    phoneNumber,
                                    companyId,
                                    dateOfBirth,
                                    position,
                                    gender,
                                    address,
                                });
                            }}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="clientEmail" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="clientEmail"
                            placeholder="john.doe@exemple.com"
                            onChange={(event) => {
                                event.preventDefault();
                                const clientEmail = event.target.value;
                                setEmail(clientEmail);
                                setClient({
                                    firstName,
                                    lastName,
                                    email,
                                    phoneNumber,
                                    companyId,
                                    dateOfBirth,
                                    position,
                                    gender,
                                    address,
                                });
                            }}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="clientPhone" className="form-label">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            className="form-control"
                            id="clientPhone"
                            placeholder="+40 0700 261 291"
                            onChange={(event) => {
                                event.preventDefault();
                                const clientPhone = event.target.value;
                                setPhoneNumber(clientPhone);
                                setClient({
                                    firstName,
                                    lastName,
                                    email,
                                    phoneNumber,
                                    companyId,
                                    dateOfBirth,
                                    position,
                                    gender,
                                    address,
                                });
                            }}
                        />
                    </div>
                    <div className="col-4">
                        <label htmlFor="clientCompany" className="form-label">
                            Company
                        </label>
                        <select
                            className="form-control"
                            id="clientCompany"
                            name="clientCompany"
                            onChange={(event) => {
                                event.preventDefault();
                                const companyValueId = event.target.value;
                                setCompanyId(parseInt(companyValueId));
                                setClient({
                                    firstName,
                                    lastName,
                                    email,
                                    phoneNumber,
                                    companyId,
                                    dateOfBirth,
                                    position,
                                    gender,
                                    address,
                                });
                            }}
                        >
                            {companies.map((company) => {
                                return (
                                    <option
                                        key={`client${company.id}`}
                                        value={company.id}
                                    >
                                        {company.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col-2">
                        <label className="form-label">Or Add Company</label>
                        <Link to="/companyform">
                            <button className="btn btn-info  ">
                                Add Company
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="clientDoB" className="form-label">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="clientDoB"
                            onChange={(event) => {
                                event.preventDefault();
                                const date =
                                    document.getElementById("clientDoB").value;
                                setDateOfBirth(date);
                                setClient({
                                    firstName,
                                    lastName,
                                    email,
                                    phoneNumber,
                                    companyId,
                                    dateOfBirth,
                                    position,
                                    gender,
                                    address,
                                });
                            }}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="clientPosition" className="form-label">
                            Position
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="clientPosition"
                            placeholder="Marketing Manager"
                            onChange={(event) => {
                                event.preventDefault();
                                const clientPosition = event.target.value;
                                setPosition(clientPosition);
                                setClient({
                                    firstName,
                                    lastName,
                                    email,
                                    phoneNumber,
                                    companyId,
                                    dateOfBirth,
                                    position,
                                    gender,
                                    address,
                                });
                            }}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="clientGender" className="form-label">
                            Gender
                        </label>
                        <select
                            className="form-control"
                            id="clientGender"
                            name="clientGender"
                            onChange={(event) => {
                                event.preventDefault();
                                const status = parseInt(event.target.value);
                                setGender(status);
                                setClient({
                                    firstName,
                                    lastName,
                                    email,
                                    phoneNumber,
                                    companyId,
                                    dateOfBirth,
                                    position,
                                    gender,
                                    address,
                                });
                            }}
                        >
                            {genders.map((opt) => {
                                return (
                                    <option
                                        key={`status${opt.value}`}
                                        value={opt.value}
                                    >
                                        {opt.label}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="col-12">
                        <label htmlFor="clientAddress" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="clientAddress"
                            placeholder="Bucharest str Maica Domnului nr 11"
                            onChange={(event) => {
                                event.preventDefault();
                                const clientAddress = event.target.value;
                                setAddress(clientAddress);
                                setClient({
                                    firstName,
                                    lastName,
                                    email,
                                    phoneNumber,
                                    companyId,
                                    dateOfBirth,
                                    position,
                                    gender,
                                    address,
                                });
                            }}
                        />
                    </div>

                    {/* <div className="col-6">
                        <h3>Personal</h3>
                        <Link to="/clientpersonalform">
                            <button className="btn btn-info ">
                                Add Approach
                            </button>
                        </Link>
                    </div>
                    <div className="col-6">
                        <h3>Profesional</h3>
                        <Link to="/clientprofessionalform">
                            <button className="btn btn-info  btn-block">
                                Add Approach
                            </button>
                        </Link>
                    </div> */}

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

export default ClientForm;
