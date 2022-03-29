import Chart from "react-apexcharts";
import React from "react";
import StatusCard from "../components/status-card/StatusCard";

import { Link } from "react-router-dom";
import Table from "../components/table/Table";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const themeReducer = useSelector((state) => state.themeRedux.mode);
    const user = useSelector((state) => state.authRedux);
    let deals = useSelector((state) => state.dealsRedux).deals;
    let products = useSelector((state) => state.productsRedux).products;
    let clients = useSelector((state) => state.clientsRedux).clients;

    const prioritys = ["Low", "Medium", "High"];
    const sumOfDealInProcess = () => {
        let temp = [];
        let sum = 0;
        let valueList = [];
        if (deals !== undefined) {
            deals
                .filter(
                    (deal) =>
                        deal.status !== 6 &&
                        deal.status !== 7 &&
                        deal.UserId === user.id
                )
                .forEach((element) => {
                    temp.push(element.id);
                });
        } else {
            deals = [];
        }
        if (products !== undefined) {
            products.forEach((product) => {
                if (temp.includes(product.dealId)) {
                    sum += product.actualPrice;
                    valueList.push(product.actualPrice);
                }
            });
        } else {
            products = [];
        }
        return [sum, valueList];
    };

    const tableDataSealdDeals = () => {
        let tableBodyData = [];

        clients.forEach((client) => {
            client.UserId === user.id &&
                tableBodyData.push({
                    name: client.firstName + " " + client.lastName,
                    dealsNo: deals.filter(
                        (deal) =>
                            deal.status === 6 && client.id === deal.clientId
                    ).length,
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
                        .reduce(
                            (accumulator, current) => accumulator + current,
                            0
                        ),
                });
        });

        tableBodyData.sort((a, b) => parseFloat(b.total) - parseFloat(a.total));
        return tableBodyData.filter((x) => x.total !== 0);
    };
    const tableDatatopDeals = () => {
        let tableBodyData = [];
        if (
            deals.length !== 0 &&
            clients.length !== 0 &&
            products.length !== 0
        ) {
            deals &&
                clients &&
                products &&
                deals.forEach((deal) => {
                    tableBodyData.push({
                        name:
                            clients.filter(
                                (client) => client.id === deal.clientId
                            )[0].firstName +
                            " " +
                            clients.filter(
                                (client) => client.id === deal.clientId
                            )[0].lastName,

                        dealValue: products
                            .filter((product) => deal.id === product.dealId)
                            .map((product) => product.actualPrice)
                            .reduce(
                                (accumulator, current) => accumulator + current,
                                0
                            ),

                        priority: prioritys.at(deal.priority),
                    });
                });
            tableBodyData.sort(
                (a, b) => parseFloat(b.dealValue) - parseFloat(a.dealValue)
            );
            return tableBodyData.filter((x) => x.dealValue !== 0);
        }
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

    const sumOfSealdDeals = () => {
        let temp = [];
        let sum = 0;
        let valueList = [];
        deals
            .filter((deal) => deal.status === 6 && deal.UserId === user.id)
            .forEach((element) => {
                temp.push(element.id);
            });

        products.forEach((product) => {
            if (temp.includes(product.dealId)) {
                sum += product.actualPrice;
                valueList.push(product.actualPrice);
            }
        });

        return [sum, valueList];
    };

    const statusCard = [
        {
            icon: "bx bx-dollar-circle",
            count: `$${deals && products && sumOfDealInProcess()[0]}`,
            title: "Deals in Progress total value",
        },
        {
            icon: "bx bxs-face-mask",
            count: `${
                deals &&
                Object.keys(
                    deals.filter(
                        (deal) => deal.status !== 6 && deal.status !== 7
                    )
                ).length
            }`,
            title: "No. of Deals in Progress",
        },
        {
            icon: "bx bx-dollar-circle",
            count: `$${deals && products && sumOfSealdDeals()[0]}`,
            title: `Sealed Deals total value`,
        },
        {
            icon: "bx bxs-face-mask",
            count: `${
                deals &&
                Object.keys(deals.filter((deal) => deal.status === 6)).length
            }`,
            title: "No. of Sealed Deals",
        },
    ];

    const chartOptions = {
        series: [
            {
                name: "Deals in Progress",
                data:
                    (deals, products, clients) && sumOfDealInProcess()[1]
                        ? sumOfDealInProcess()[1]
                        : [],
            },
            {
                name: "Sealed Deals",
                data:
                    (deals, products, clients) && sumOfSealdDeals()[1]
                        ? sumOfSealdDeals()[1]
                        : [],
            },
        ],
        options: {
            color: ["#6ab04c", "#2980b9"],
            chart: {
                background: "transparent",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
            },
            xaxis: {
                category: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                ],
            },
            legend: {
                position: "top",
            },
            grid: {
                show: false,
            },
        },
    };
    const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

    const renderCusomerBodyForTopCustomersTable = (item, index) => (
        <tr key={index}>
            <td>{item.name}</td>
            <td>{item.dealsNo}</td>
            <td>{item.total}</td>
        </tr>
    );
    const renderCusomerBodyForTopDealsTable = (item, index) => (
        <tr key={index}>
            <td>{item.name}</td>
            <td>{item.dealValue}</td>
            <td>{item.priority}</td>
        </tr>
    );
    const topCustomers = {
        head: ["Client", "No. of Deals", "Total "],
        body: tableDataSealdDeals(),
    };
    const topDeals = {
        head: ["Client", "Value", "priority"],
        body: tableDatatopDeals(),
    };

    return deals.length !== 0 &&
        clients.length !== 0 &&
        products.length !== 0 ? (
        <div>
            <h2 className="page-header">Dashboard</h2>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        {statusCard.map((item, index) => (
                            <div className="col-6" key={index}>
                                <StatusCard
                                    icon={item.icon}
                                    count={item.count}
                                    title={item.title}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-6">
                    <div className="card full-height">
                        <Chart
                            options={
                                themeReducer === "theme-mode-dark"
                                    ? {
                                          ...chartOptions.options,
                                          theme: { mode: "dark" },
                                      }
                                    : {
                                          ...chartOptions.options,
                                          theme: { mode: "light" },
                                      }
                            }
                            series={chartOptions.series}
                            type="line"
                            height="100%"
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <div className="card__header">
                            <h3>top customers</h3>
                        </div>
                        <div className="card__body">
                            <Table
                                headData={topCustomers.head}
                                renderHead={(item, index) =>
                                    renderCusomerHead(item, index)
                                }
                                bodyData={topCustomers.body}
                                renderBody={(item, index) =>
                                    renderCusomerBodyForTopCustomersTable(
                                        item,
                                        index
                                    )
                                }
                                limit={3}
                            />
                        </div>
                        <div className="card__footer">
                            <Link to="/clients">view all</Link>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <div className="card__header">
                            <h3>top deals</h3>
                        </div>
                        <div className="card__body">
                            <Table
                                headData={topDeals.head}
                                renderHead={(item, index) =>
                                    renderCusomerHead(item, index)
                                }
                                bodyData={topDeals.body}
                                renderBody={(item, index) =>
                                    renderCusomerBodyForTopDealsTable(
                                        item,
                                        index
                                    )
                                }
                                limit={3}
                            />
                        </div>
                        <div className="card__footer">
                            <Link to="/clients">view all</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div>
            <h2 className="page-header">Loading Dashboard</h2>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        {statusCard.map((item, index) => (
                            <div className="col-6" key={index}>
                                <StatusCard
                                    icon={item.icon}
                                    count={item.count}
                                    title={item.title}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-6">
                    <div className="card full-height">
                        <Chart
                            options={
                                themeReducer === "theme-mode-dark"
                                    ? {
                                          ...chartOptions.options,
                                          theme: { mode: "dark" },
                                      }
                                    : {
                                          ...chartOptions.options,
                                          theme: { mode: "light" },
                                      }
                            }
                            series={chartOptions.series}
                            type="line"
                            height="100%"
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <div className="card__header">
                            <h3>top customers</h3>
                        </div>
                        <div className="card__body"></div>
                        <div className="card__footer">
                            <Link to="/clients">view all</Link>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <div className="card__header">
                            <h3>top deals</h3>
                        </div>
                        <div className="card__body"></div>
                        <div className="card__footer">
                            <Link to="/clients">view all</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
