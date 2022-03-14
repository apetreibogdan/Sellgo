import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useSelector } from "react-redux";

const Card = ({ deals, boardId, changePriority }) => {
    let products = useSelector((state) => state.productsRedux).products;
    let clients = useSelector((state) => state.clientsRedux).clients;
    const incons = [
        "⭕️",
        "🔆️",
        "⚠️",
        "🟡",
        "☢️",
        "😵",
        "✅",
        "❌",
        "🟣",
        "⚫️",
        "⚪️",
        "🟤",
    ];
    const dragStart = (e) => {
        const target = e.target;

        e.dataTransfer.setData("card_id", target.id);
    };

    const dragOver = (e) => {
        e.stopPropagation();
    };

    const prioritys = ["High Priority", "Medium Priority", "Low Priority"];

    const nrOfDealsAndSumOfDeals = (deal) => {
        let body = [];
        body.sum = 0;
        body.count = 0;
        body.names = "";
        products.forEach((element) => {
            if (element.dealId === deal.id) {
                body.sum += element.actualPrice;
                body.count += 1;
                body.names += element.name + " ";
            }
        });

        return body;
    };

    return (
        <>
            {deals !== undefined
                ? deals.map((deal) =>
                      deal.status == boardId
                          ? (console.log(deal),
                            (
                                <Tippy
                                    className="tomato-theme"
                                    key={`tippy-${deal.id}`}
                                    content={
                                        <span
                                            className={`colorpriority${deal.priority}`}
                                        >
                                            {prioritys.at(deal.priority)}
                                        </span>
                                    }
                                >
                                    <div
                                        key={`status-${deal.id}`}
                                        id={deal.id}
                                        className={`card priority${deal.priority} CardTile`}
                                        draggable="true"
                                        onDragStart={dragStart}
                                        onDragOver={dragOver}
                                        // onDoubleClick={() =>updatePriority(deal.id)}
                                        onDoubleClick={() =>
                                            changePriority(deal.id)
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        {clients.map((client) => {
                                            return client.id === deal.clientId
                                                ? client.firstName
                                                : null;
                                        })}
                                        {" - "}
                                        {nrOfDealsAndSumOfDeals(deal).count}
                                        {nrOfDealsAndSumOfDeals(deal).count >= 2
                                            ? "products ="
                                            : "product ="}
                                        {nrOfDealsAndSumOfDeals(deal).sum}
                                        {"$ "}
                                        {incons.at(boardId)}
                                    </div>
                                </Tippy>
                            ))
                          : ""
                  )
                : ""}
        </>
    );
};
export default Card;
