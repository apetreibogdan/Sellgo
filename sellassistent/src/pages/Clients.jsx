import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import Table from "../components/table/Table";

const Clients = () => {
    const user = useSelector((state) => state.authRedux);
    let deals = useSelector((state) => state.dealsRedux).deals;
    let products = useSelector((state) => state.productsRedux).products;
    let clients = useSelector((state) => state.clientsRedux).clients;

    useEffect(() => {
        return "Loading";
    }, [clients]);
    const customTableHead = [
        "Client",
        "Deals In Progress",
        "Potential ",
        "Deals Sealed",
        "Total Sold",
        "Deals Lose",
        "Total Losed",
    ];
    const tableBodyData = () => {
        let tableBodyData = [];

        clients.forEach((client) => {
            tableBodyData.push({
                name: client.firstName + " " + client.lastName,
                dealsInProgress: deals.filter(
                    (deal) =>
                        deal.status !== 7 &&
                        deal.status !== 6 &&
                        client.id === deal.clientId
                ).length,

                dealsSeald: deals.filter(
                    (deal) => deal.status === 6 && client.id === deal.clientId
                ).length,
                restToMake: products
                    .filter((product) =>
                        containsObject(
                            product.dealId,

                            deals
                                .filter(
                                    (deal) =>
                                        deal.status !== 6 &&
                                        deal.status !== 7 &&
                                        client.id === deal.clientId
                                )
                                .map((deal) => deal.id)
                        )
                    )
                    .map((product) => product.actualPrice)
                    .reduce((accumulator, current) => accumulator + current, 0),

                total: products
                    .filter((product) =>
                        containsObject(
                            product.dealId,

                            deals
                                .filter(
                                    (deal) =>
                                        deal.status === 6 &&
                                        client.id === deal.clientId
                                )
                                .map((deal) => deal.id)
                        )
                    )
                    .map((product) => product.actualPrice)
                    .reduce((accumulator, current) => accumulator + current, 0),
                dealsLose: deals.filter(
                    (deal) => deal.status === 7 && client.id === deal.clientId
                ).length,
                lose: products
                    .filter((product) =>
                        containsObject(
                            product.dealId,

                            deals
                                .filter(
                                    (deal) =>
                                        deal.status === 7 &&
                                        client.id === deal.clientId
                                )
                                .map((deal) => deal.id)
                        )
                    )
                    .map((product) => product.actualPrice)
                    .reduce((accumulator, current) => accumulator + current, 0),
            });
        });

        tableBodyData.sort((a, b) => parseFloat(b.name) - parseFloat(a.name));
        return tableBodyData;
    };
    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }

        return false;
    }
    const renderHead = (item, index) => <th key={index}>{item}</th>;

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.name}</td>
            <td>{item.dealsInProgress}</td>
            <td>{item.restToMake}$</td>
            <td>{item.dealsSeald}</td>
            <td>{item.total}$</td>
            <td>{item.dealsLose}</td>
            <td>{item.lose}$</td>
        </tr>
    );

    return clients.length != 0 ? (
        <div className="container">
            <h2 className="page-header">All Clients</h2>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit="10"
                                headData={customTableHead}
                                renderHead={(item, index) =>
                                    renderHead(item, index)
                                }
                                bodyData={tableBodyData()}
                                renderBody={(item, index) =>
                                    renderBody(item, index)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        "Loading"
    );
};

export default Clients;
