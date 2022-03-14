import Card from "./Card";
import React from "react";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "../../api/Index";
import { connect, useSelector } from "react-redux";
import { fetchDeals } from "../../redux/Deals/DealActions";

const Board = (props) => {
    const userId = useSelector((state) => state.authRedux).user.id;
    // console.log(props.deals.deals);
    // const [deals, setDeals] = useState([]);

    useEffect(() => {
        // const fetchDeals = async () => {
        //     const res = await fetch(
        //         `${ENDPOINTS.BASE_URL}${ENDPOINTS.DEAL}dealsforuser/${user.user.id}`
        //     );
        //     let data = await res.json();
        //     setDeals(data);
        // };
        props.fetchDeals(userId);
    }, []);

    const fetchDeal = async (id) => {
        const res = await fetch(`${ENDPOINTS.BASE_URL}${ENDPOINTS.DEAL}${id}`);
        const data = await res.json();

        return data;
    };
    const updateDeal = async (id, statusId) => {
        const taskToToggle = await fetchDeal(id);
        const updTask = { ...taskToToggle, status: statusId };

        await fetch(`${ENDPOINTS.BASE_URL}${ENDPOINTS.DEAL}${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updTask),
        });
        props.fetchDeals(userId);
    };

    const drop = async (e) => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData("card_id");
        const statusId = e.target.getAttribute("statusid");
        // // / DRAG AN DROP ON FRONTEND
        // const card = document.getElementById(card_id);
        // card.style.display = "block";
        // e.target.appendChild(card);

        updateDeal(card_id, statusId);
        props.fetchDeals(userId);
    };
    const changePriority = async (id) => {
        const dealToChangePriority = await fetchDeal(id);
        let priority = 0;
        if (dealToChangePriority.priority === 0) {
            priority = 1;
        } else if (dealToChangePriority.priority === 1) {
            priority = 2;
        }

        const updDeal = { ...dealToChangePriority, priority: priority };
        await fetch(`${ENDPOINTS.BASE_URL}${ENDPOINTS.DEAL}${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updDeal),
        });
        props.fetchDeals(userId);
    };

    const dragOver = (e) => {
        e.preventDefault();
    };
    return (
        <>
            <span>
                Priority: <b style={{ color: "red" }}>High</b>,{" "}
                <b style={{ color: "#00c8e2" }}>Medium</b>,{" "}
                <b style={{ color: "yellow" }}>Low</b>
            </span>
            {props.headData.map((item, index) => (
                <div
                    key={`status-${index}`}
                    statusid={index}
                    draggable="false"
                    onDrop={drop}
                    onDragOver={dragOver}
                    className="card col-3 cardSpace"
                >
                    {" "}
                    <span className="cardTitle">{item}</span>
                    <Card
                        deals={props.deals.deals}
                        boardId={index}
                        changePriority={changePriority}
                    />
                </div>
            ))}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        deals: state.dealsRedux,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDeals: (userId) => dispatch(fetchDeals(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
