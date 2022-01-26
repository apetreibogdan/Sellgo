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

    const prioritys = ["Low Priority", "Medium Priority", "High Priority"];

    return (
        <>
            {deals !== undefined
                ? deals.map((deal) =>
                      deal.status == boardId ? (
                          <Tippy
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
                                  className={`card priority${deal.priority}`}
                                  draggable="true"
                                  onDragStart={dragStart}
                                  onDragOver={dragOver}
                                  // onDoubleClick={() =>updatePriority(deal.id)}
                                  onDoubleClick={() => changePriority(deal.id)}
                                  style={{ cursor: "pointer" }}
                              >
                                  {clients.map((client) => {
                                      return client.id === deal.clientId
                                          ? client.firstName
                                          : null;
                                  })}
                                  {" - "}
                                  {products.map((product) => {
                                      return product.dealId === deal.id
                                          ? `${product.name} $${product.actualPrice}`
                                          : null;
                                  })}{" "}
                                  {incons.at(boardId)}
                              </div>
                          </Tippy>
                      ) : (
                          ""
                      )
                  )
                : ""}
        </>
    );
};
export default Card;
