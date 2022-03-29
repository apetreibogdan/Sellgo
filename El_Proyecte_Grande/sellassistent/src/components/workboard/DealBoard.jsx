import { useSelector } from "react-redux";
import React from "react";
import "./dealBoard.css";
import { Link } from "react-router-dom";

const DealBoard = () => {
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
    let deals = useSelector((state) => state.dealsRedux).deals;
    let products = useSelector((state) => state.productsRedux).products;
    let clients = useSelector((state) => state.clientsRedux).clients;
    let companies = useSelector((state) => state.companiesRedux).companies;
    let interceptions = useSelector(
        (state) => state.interceptionsRedux
    ).interceptions;
    let myData = undefined;

    if (deals !== undefined) {
        myData = [].concat(deals).sort((a, b) => a.priority - b.priority); //sortare dupa prioritate
    }

    let showInterceptionOrAddIternception = (deal) => {
        let inter = interceptions.map((interception) => {
            return interception.dealId === deal.id ? (
                <div
                    className="pillText"
                    key={`interception${interception.id}`}
                >
                    {interception.date.split("T")[0]}{" "}
                    {interception.date.split("T")[1]}
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
            return <div className="pillText">Add Interception</div>;
        }
        return inter;
    };

    let showDealSizeOrZERO = (deal) => {
        let sum = 0;
        let inter = products.map((product) => {
            if (product.dealId === deal.id) {
                sum = sum + product.actualPrice;
            }
        });
        if (sum === 0) {
            return <div className="pillText">0</div>;
        }
        return (
            <div className="pillText" key={`size${deal.id}`}>
                {sum}
            </div>
        );
    };

    let showDealSizeOrAddProduct = (deal) => {
        let produse = "";
        let inter = products.map((product) => {
            if (product.dealId === deal.id) {
                produse = produse + product.name + ", ";
            }
        });

        if (produse === "") {
            return <div className="pillText">Add Product</div>;
        }
        return (
            <div className="pillText" key={`product${deal.id}`}>
                {produse.slice(0, produse.length - 2)}
            </div>
        );
    };

    if (myData !== undefined) {
        return myData.map((deal) => (
            <div className="container card pillcard">
                <div className="row">
                    <Link
                        to={`/deal/${deal.id}`}
                        className="col pill pillClient"
                    >
                        {clients.map((client) => {
                            return client.id === deal.clientId ? (
                                <div
                                    className="pillText"
                                    key={`client${client.id}`}
                                >
                                    {client.firstName} {client.lastName}
                                </div>
                            ) : null;
                        })}
                    </Link>
                    <div className="col pill pillCompany">
                        {clients.map((client) => {
                            return client.id === deal.clientId
                                ? companies.map((company) => {
                                      return company.id === client.companyId ? (
                                          <div
                                              className="pillText"
                                              key={`company${company.id}`}
                                          >
                                              {company.name}
                                          </div>
                                      ) : null;
                                  })
                                : null;
                        })}
                    </div>
                    <div className="col pill pillDealStatus">
                        <div className="pillText">
                            {statuses.at(deal.status)}
                        </div>
                    </div>
                    <Link
                        to={`/addInterception/${deal.id}`}
                        className="col pill pillInterception"
                        id={`intr${deal.id}`}
                    >
                        {showInterceptionOrAddIternception(deal)}
                    </Link>

                    <div className="col pill pillPriority">
                        <div
                            className={`pillText colorpriority${deal.priority}`}
                        >
                            {prioritys.at(deal.priority)}
                        </div>
                    </div>
                    <div className="col pill PillDealSize">
                        {showDealSizeOrZERO(deal)}
                    </div>
                    <Link
                        to={`/addProducts/${deal.id}`}
                        className="col pill pillProduct"
                    >
                        {showDealSizeOrAddProduct(deal)}
                    </Link>
                </div>
            </div>
        ));
    } else {
        return "...Loading";
    }
};

export default DealBoard;

/// o alta varianta
// let showDealSizeOrZERO = (deal) => {
//     let inter = products.map((product) => {
//         return product.dealId === deal.id ? (
//             <div
//                 className="pillText"
//                 key={`size${product.id}`}
//                 minPrice={product.minimPrice}
//                 maxPrice={product.actualPrice}
//             >
//                 {product.actualPrice}
//             </div>
//         ) : null;
//     });
//     let result = true;
//     for (let index = 0; index < inter.length; index++) {
//         if (inter[index] != null) {
//             result = false;
//         }
//     }
//     if (result == true) {
//         return <div className="pillText">0</div>;
//     }
//     return inter;
// };

// let showDealSizeOrAddProduct = (deal) => {
//     let inter = products.map((product) => {
//         return product.dealId === deal.id ? (
//             <div className="pillText" key={`product${product.id}`}>
//                 {product.name}
//             </div>
//         ) : null;
//     });
//     let result = true;
//     for (let index = 0; index < inter.length; index++) {
//         if (inter[index] != null) {
//             result = false;
//         }
//     }
//     if (result == true) {
//         return <div className="pillText">Add Product</div>;
//     }
//     return inter;
// };
