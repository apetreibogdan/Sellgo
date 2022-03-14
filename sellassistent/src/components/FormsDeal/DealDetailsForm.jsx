import { ENDPOINTS } from "../../api/Index";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPersonalApproach } from "../../redux/ClientPersonalApproach/ClientPersonalApproachActions";
import axios from "axios";
import { useHistory } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

import React, { useState, useEffect } from "react";

const DealDetailsForm = ({ location }) => {
    const history = useHistory();
    let user = useSelector((state) => state.authRedux);
    const statuses = [
        "To Contact",
        "Contact Made",
        "Meeting Arranged",
        "Needs Defined",
        "Proposal Made",
        "Negotiations Started",
        "Sealed",
        "Failed",
    ];
    const prioritys = ["High", "Medium", "Low"];
    const dealId = location.pathname.split("/").at(-1);
    let deals = useSelector((state) => state.dealsRedux).deals;
    let products = useSelector((state) => state.productsRedux).products;
    let clients = useSelector((state) => state.clientsRedux).clients;
    let companies = useSelector((state) => state.companiesRedux).companies;
    let interceptions = useSelector(
        (state) => state.interceptionsRedux
    ).interceptions;
    let testpersonalApproach = undefined;
    let testprofessionalApproach = undefined;
    const [personalApproach, setPersonalApproach] = useState();

    const [professionalApproach, setProfessionalApproach] = useState();

    const [deal, setDeal] = useState();
    useEffect(async () => {
        if (deals !== undefined) {
            setDeal(deals.filter((elem) => elem.id == dealId).at(0));
        }
        if (deal !== undefined) {
            testpersonalApproach = await getPersonalApproach(deal.clientId);
            testprofessionalApproach = await getProfessionalApproach(
                deal.clientId
            );
        }
        if (
            testpersonalApproach !== undefined &&
            testprofessionalApproach !== 0
        ) {
            setPersonalApproach(testpersonalApproach.at(0));
        }
        if (
            testprofessionalApproach !== undefined &&
            testprofessionalApproach !== 0
        ) {
            setProfessionalApproach(testprofessionalApproach.at(0));
        }
    }, [deals, deal]);

    const getPersonalApproach = async (clientId) => {
        const res = await fetch(
            `${ENDPOINTS.BASE_URL}${ENDPOINTS.PERSONALAPPROACH}${clientId}`
        );
        const data = await res.json();

        return data;
    };
    const getProfessionalApproach = async (clientId) => {
        const res = await fetch(
            `${ENDPOINTS.BASE_URL}${ENDPOINTS.PROFESSIONALAPPROACH}${clientId}`
        );
        const data = await res.json();

        return data;
    };

    const handleDelete = (id, endpoint) => {
        axios.delete(`${ENDPOINTS.BASE_URL}${endpoint}?id=${id}`);
        if (endpoint === ENDPOINTS.DEAL) {
            window.location.replace(`/workboard`);
        } else {
            window.location.reload();
        }
    };
    let showInterceptions = (deal) => {
        let inter = interceptions.map((interception) => {
            return interception.dealId === deal.id ? (
                <>
                    <span key={`interception${interception.id}`}>
                        Closest Interception: {interception.date.split("T")[0]}{" "}
                        {interception.date.split("T")[1]}
                    </span>
                    <i
                        className="bx bxs-trash delete-icon"
                        onClick={() =>
                            handleDelete(
                                interception.id,
                                ENDPOINTS.INTERCEPTION
                            )
                        }
                    ></i>
                </>
            ) : null;
        });
        let result = true;
        for (let index = 0; index < inter.length; index++) {
            if (inter[index] != null) {
                result = false;
            }
        }
        if (result == true) {
            return <span>Zero Interception!</span>;
        }
        return inter;
    };

    let showProducts = (deal) => {
        let inter = products.map((product) => {
            return product.dealId === deal.id ? (
                <div>
                    <span key={`product${product.id}`}>
                        <span style={{ fontWeight: "bold" }}>
                            {" "}
                            {product.name}
                        </span>{" "}
                        {product.actualPrice}${"    "}
                        {product.description}
                        {"   "}
                    </span>

                    <i
                        className="bx bxs-trash delete-icon"
                        onClick={() =>
                            handleDelete(product.id, ENDPOINTS.PRODUCT)
                        }
                    ></i>
                    <br />
                </div>
            ) : null;
        });
        let result = true;
        for (let index = 0; index < inter.length; index++) {
            if (inter[index] != null) {
                result = false;
            }
        }
        if (result == true) {
            return <span>No Products</span>;
        }
        return inter;
    };
    let showDealSizeOrZERO = (deal) => {
        let sum = 0;
        products.map((product) => {
            if (product.dealId === deal.id) {
                sum = sum + product.actualPrice;
            }
        });
        if (sum === 0) {
            return <span>0</span>;
        }
        return <span key={`size${deal.id}`}>{sum}</span>;
    };
    const editPersonalApproach = async (value) => {
        await fetch(
            `${ENDPOINTS.BASE_URL}${ENDPOINTS.PERSONALAPPROACH}${value.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(value),
            }
        );
    };
    const editProfessionalApproach = async (value) => {
        await fetch(
            `${ENDPOINTS.BASE_URL}${ENDPOINTS.PROFESSIONALAPPROACH}${value.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(value),
            }
        );
    };
    const addPersonalApproach = async (value) => {
        await fetch(`${ENDPOINTS.BASE_URL}${ENDPOINTS.PERSONALAPPROACH}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(value),
        });
    };
    const addProfessionalApproach = async (value) => {
        await fetch(`${ENDPOINTS.BASE_URL}${ENDPOINTS.PROFESSIONALAPPROACH}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(value),
        });
    };

    const EditorPersonal = () => {
        const [value, setValue] = useState(personalApproach);

        const handleChange = (event) => {
            setValue({ ...value, details: event.target.value });
            console.log(value);
        };
        const updateEvenet = () => {
            editPersonalApproach(value);
        };
        return (
            <form onSubmit={updateEvenet}>
                <TextareaAutosize
                    minRows={3}
                    className="col-12 textareaApproach"
                    type="text"
                    id="clientPersonalDetail"
                    name="textarea"
                    value={value.details}
                    onChange={handleChange}
                />
                <div className="col-12">
                    <button type="submit" className="btn btn-info">
                        Update Personal Approach
                    </button>
                </div>
            </form>
        );
    };
    const AddPersonal = () => {
        const [value, setValue] = useState({
            details: "",
            clientId: deal.clientId,
        });

        const handleChange = (event) => {
            setValue({ ...value, details: event.target.value });
            console.log(value);
        };
        const updateEvenet = () => {
            addPersonalApproach(value);
        };
        return (
            <form className="row" onSubmit={updateEvenet}>
                <TextareaAutosize
                    minRows={3}
                    className="col-6 textareaApproach"
                    type="text"
                    id="details"
                    name="details"
                    placeholder="Write here your personal approach for this client...."
                    value={value.details}
                    onChange={handleChange}
                />
                <div className="col-6">
                    <button type="submit" className="btn btn-info">
                        Add Personal Approach
                    </button>
                </div>
            </form>
        );
    };
    const EditorProfessional = () => {
        const [value, setValue] = useState(professionalApproach);

        const handleChange = (event) => {
            setValue({ ...value, details: event.target.value });
            console.log(value);
        };
        const updateEvenet = () => {
            editProfessionalApproach(value);
        };
        return (
            <form onSubmit={updateEvenet}>
                <TextareaAutosize
                    minRows={3}
                    className="col-12 textareaApproach"
                    type="text"
                    id="clientProfessionalDetail"
                    name="textarea"
                    oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
                    value={value.details}
                    onChange={handleChange}
                />
                <div className="col-12">
                    <button type="submit" className="btn btn-info">
                        Update Professional Approach
                    </button>
                </div>
            </form>
        );
    };

    const AddProfessional = () => {
        const [value, setValue] = useState({
            details: "",
            clientId: deal.clientId,
        });

        const handleChange = (event) => {
            setValue({ ...value, details: event.target.value });
            console.log(value);
        };
        const updateEvenet = () => {
            addProfessionalApproach(value);
        };
        return (
            <form className="row" onSubmit={updateEvenet}>
                <TextareaAutosize
                    className="col-6 textareaApproach"
                    minRows={3}
                    type="text"
                    id="details"
                    name="details"
                    placeholder="Write here your professional approach for this client...."
                    value={value.details}
                    onChange={handleChange}
                />
                <div className="col-6">
                    <button type="submit" className="btn btn-info">
                        Add Professional Approach
                    </button>
                </div>
            </form>
        );
    };

    return deals !== undefined && deal !== undefined ? (
        <div className="container">
            <h3>
                Deal <b>{deal.id}</b> Details
            </h3>

            <div className="container card">
                <div className="row ">
                    <div className="col-6 ml-5">
                        <span> Status: {statuses.at(deal.status)}</span>
                    </div>
                    <div className="col-5">
                        <span>Priority: {prioritys.at(deal.priority)}</span>
                    </div>
                    <div className="col-1">
                        <i
                            className="bx bxs-trash delete-icon"
                            onClick={() =>
                                handleDelete(deal.id, ENDPOINTS.DEAL)
                            }
                        ></i>
                    </div>
                    <hr className="mt-3" />
                    <div className="col-6 nopadding">
                        <div className="col-12">
                            Products: {showProducts(deal)}
                            <br></br>
                            Total: {showDealSizeOrZERO(deal)}$
                        </div>
                        <Link to={`/addProducts/${deal.id}`} className="col-12">
                            <button className="btn btn-info mt-1">
                                Add Product
                            </button>
                        </Link>
                    </div>
                    <div className="col-6 nopadding">
                        <div className="col-12 ">
                            <span>{showInterceptions(deal)}</span>
                        </div>

                        <Link
                            className="col-12 "
                            to={`/addInterception/${deal.id}`}
                            id={`intr${deal.id}`}
                        >
                            {" "}
                            <button className="btn btn-info mt-4">
                                Add Interception
                            </button>
                        </Link>
                    </div>
                    <hr className="mt-3" />
                    {clients.map((client) => {
                        return client.id === deal.clientId ? (
                            <>
                                <span className="col-4">
                                    Client: {client.firstName} {client.lastName}
                                </span>
                                <span className="col-4">
                                    Email : {client.email}
                                    {"  "}
                                </span>
                                {"  "}
                                <span className="col-4">
                                    BirthDate :{" "}
                                    {client.dateOfBirth.split("T").at(0)}
                                    {"  "}
                                </span>
                                <span className="col-4">
                                    Position : {client.position}
                                    {"  "}
                                </span>{" "}
                                <span className="col-4">
                                    PhoneNumber : {client.phoneNumber}
                                    {"  "}
                                </span>{" "}
                                <span className="col-4">
                                    Address : {client.address}
                                    {"  "}
                                </span>{" "}
                            </>
                        ) : null;
                    })}
                    <hr className="mt-3" />
                    {/* Company name */}
                    {clients.map((client) => {
                        return client.id === deal.clientId
                            ? companies.map((company) => {
                                  return company.id === client.companyId ? (
                                      <>
                                          <span
                                              className="col-6"
                                              key={`company${company.id}name`}
                                          >
                                              Company name: {company.name}
                                          </span>
                                          <br></br>
                                          <span
                                              className="col-6"
                                              key={`company${company.id}email`}
                                          >
                                              Company email: {company.email}
                                          </span>
                                      </>
                                  ) : null;
                              })
                            : null;
                    })}
                    <hr className="mt-3" />
                    {/* PersonalForm */}
                    {/* <div className="row"> */}
                    <span className="col-6 mb-1">Personal Approach:</span>
                    <span className="col-6 mb-1 ">Professional Approach:</span>
                    <div className="col-6">
                        {personalApproach === undefined ||
                        personalApproach.length === 0 ? (
                            <AddPersonal />
                        ) : (
                            <EditorPersonal />
                        )}
                    </div>{" "}
                    <div className="col-6">
                        {professionalApproach === undefined ||
                        professionalApproach.length === 0 ? (
                            <AddProfessional />
                        ) : (
                            <EditorProfessional />
                        )}
                    </div>
                    {/* </div> */}
                    <br />
                </div>
            </div>
        </div>
    ) : (
        "...Loading"
    );
};

export default DealDetailsForm;
