import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { ENDPOINTS } from "../../api/Index";
import { Link } from "react-router-dom";

const AddInterceptionForm = (props) => {
    const dealId = props.location.pathname.split("/").at(-1);
    const [date, setDate] = useState("2023-01-01T00:00:00");
    const [day, setDay] = useState(""); //done
    const [hour, setHour] = useState(""); // done
    const location = 0;
    const [onlineMeet, setOnlineMeet] = useState(""); //done

    const [interception, setInterception] = useState({
        dealId,
        date,
        location,
        onlineMeet,
    });
    useEffect(() => {
        setInterception({ dealId, date, location, onlineMeet });
    }, [date, onlineMeet]);
    const addIntercetion = async (interception) => {
        setTimeout(() => 222222);
        await fetch(`${ENDPOINTS.BASE_URL}${ENDPOINTS.INTERCEPTION}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(interception),
        });
        window.location.replace(`/deal/${dealId}`);
    };

    return (
        <div className="container">
            <h3>Add Interception to deal {dealId}</h3>
            <div className="container card">
                <form
                    className="row g-3"
                    onSubmit={(event) => {
                        event.preventDefault();

                        setInterception({ dealId, date, location, onlineMeet });

                        addIntercetion(interception);
                    }}
                >
                    <div className="card-body col-6">
                        <div className="col-12">
                            <label htmlFor="date" className="form-label">
                                Date Next Meeting
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                onChange={(event) => {
                                    event.preventDefault();
                                    const day =
                                        document.getElementById("date").value;
                                    setDay(day);
                                    setDate(`${day}T${hour}:00`);

                                    setInterception({
                                        dealId,
                                        day,
                                        location,
                                        onlineMeet,
                                    });
                                }}
                            />
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">
                                Select Location
                            </label>
                            <select
                                className="form-control"
                                id="location"
                                name="location"
                            >
                                <option key={"location0"} value={0}>
                                    Virtual
                                </option>
                            </select>
                        </div>
                        <br />
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                                Save all info
                            </button>
                        </div>
                    </div>
                    <div className="card-body col-6">
                        <div className="col-12">
                            <label htmlFor="time" className="form-label">
                                Hour for Next
                            </label>
                            <input
                                type="time"
                                className="form-control"
                                id="time"
                                onChange={(event) => {
                                    event.preventDefault();
                                    const hour =
                                        document.getElementById("time").value;
                                    setHour(hour);
                                    setDate(`${day}T${hour}:00`);
                                    setInterception({
                                        dealId,
                                        day,
                                        location,
                                        onlineMeet,
                                    });
                                }}
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="onlineMeet" className="form-label">
                                Online Meet
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="onlineMeet"
                                placeholder="www.googlemeet.com"
                                onChange={(event) => {
                                    event.preventDefault();
                                    const meet = event.target.value;
                                    setOnlineMeet(meet);

                                    setInterception({
                                        dealId,
                                        day,
                                        location,
                                        onlineMeet,
                                    });
                                }}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddInterceptionForm;
