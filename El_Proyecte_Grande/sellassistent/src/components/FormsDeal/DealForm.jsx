import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ENDPOINTS } from "../../api/Index";

import { Link } from "react-router-dom";

const DealForm = () => {
    const optionsPriorities = [
        { value: 0, label: "High" },
        { value: 1, label: "Medium" },
        { value: 2, label: "Low" },
    ];
    const optionsStatuses = [
        { value: 0, label: "To Contact" },
        { value: 1, label: "Contact Made" },
        { value: 2, label: "Meeting Arranged" },
        { value: 3, label: "Needs Defined" },
        { value: 4, label: "Proposal Made" },
        { value: 5, label: "Negotiations Started" },
        { value: 6, label: "Sealed" },
        { value: 7, label: "Failed" },
    ];

    let clients = useSelector((state) => state.clientsRedux).clients;
    const userId = useSelector((state) => state.authRedux).user.id;

    const [priority, setPriorityDeal] = useState(0); //done
    const [status, setStatusDeal] = useState(0); // done
    const [clientId, setClientId] = useState(1); //done

    const [deal, setDeal] = useState({ userId, priority, status, clientId }); // done

    useEffect(() => {
        setDeal({
            userId,
            priority,
            status,
            clientId,
        });

        if (clients.length === 0) {
            setClientId(0);
        }
    }, [priority, status, clientId]);

    const addDeal = async (deal) => {
        setTimeout(() => 222222);
        await fetch(`${ENDPOINTS.BASE_URL}${ENDPOINTS.DEAL}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(deal),
        });
        window.location.replace("/workboard");
    };

    return clients !== 0 ? (
        <div className="container">
            <h3>Add Deal</h3>
            <div className="container card">
                <form
                    className="row g-3"
                    onSubmit={(event) => {
                        event.preventDefault();

                        addDeal(deal);
                    }}
                >
                    <div className="col-4">
                        <label htmlFor="client" className="form-label">
                            Select Client
                        </label>
                        <select
                            className="form-control"
                            id="client"
                            name="client"
                            onChange={(event) => {
                                event.preventDefault();
                                const clientValueId = event.target.value;
                                setClientId(parseInt(clientValueId));
                                setDeal({
                                    userId,
                                    priority,
                                    status,
                                    clientId,
                                });
                            }}
                        >
                            {clients.map((client) => {
                                return (
                                    <option
                                        key={`client${client.id}`}
                                        value={client.id}
                                    >
                                        {client.firstName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col-2">
                        <label className="form-label">Or Add Client</label>
                        <Link to="/clientform">
                            <button className="btn btn-info ">
                                Add Client
                            </button>
                        </Link>
                    </div>
                    <div className="col-6"></div>
                    <div className="col-3">
                        <label htmlFor="status" className="form-label">
                            Status
                        </label>
                        <select
                            className="form-control"
                            id="status"
                            name="status"
                            onChange={(event) => {
                                event.preventDefault();
                                const status = parseInt(event.target.value);
                                setStatusDeal(status);
                                setDeal({
                                    userId,
                                    priority,
                                    status,
                                    clientId,
                                });
                            }}
                        >
                            {optionsStatuses.map((opt) => {
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
                    <div className="col-3">
                        <label htmlFor="priority" className="form-label">
                            Priority
                        </label>
                        <select
                            className="form-control"
                            id="priority"
                            name="priority"
                            onChange={(event) => {
                                event.preventDefault();
                                const priority = parseInt(event.target.value);
                                setPriorityDeal(priority);
                                setDeal({
                                    userId,
                                    priority,
                                    status,
                                    clientId,
                                });
                            }}
                        >
                            {optionsPriorities.map((opt) => {
                                return (
                                    <option
                                        key={`priority${opt.value}`}
                                        value={opt.value}
                                    >
                                        {opt.label}
                                    </option>
                                );
                            })}
                        </select>
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
    ) : (
        "Loading"
    );
};

export default DealForm;
