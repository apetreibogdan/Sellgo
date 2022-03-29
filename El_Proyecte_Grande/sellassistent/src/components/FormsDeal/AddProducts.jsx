import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { ENDPOINTS } from "../../api/Index";
import { Link } from "react-router-dom";

const AddProducts = (props) => {
    const dealId = props.location.pathname.split("/").at(-1);
    const [name, setName] = useState("ProductName");
    const [description, setDescription] = useState("ProductDescription"); //done
    const [actualPrice, setActualPrice] = useState(1); // done
    const [minimPrice, setMinimPrice] = useState(actualPrice * 0.7); // done

    const [product, setProduct] = useState({
        dealId,
        name,
        description,
        actualPrice,
        minimPrice,
    });
    useEffect(() => {
        setProduct({ dealId, name, description, actualPrice, minimPrice });
    }, [name, description, actualPrice]);
    const addProduct = async (product) => {
        setTimeout(() => 222222);
        await fetch(`${ENDPOINTS.BASE_URL}${ENDPOINTS.PRODUCT}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(product),
        });
        window.location.replace(`/deal/${dealId}`);
    };

    return (
        <div className="container">
            <h3>Add Product to deal {dealId}</h3>
            <div className="container card">
                <form
                    className="row g-3"
                    onSubmit={(event) => {
                        event.preventDefault();

                        setProduct({
                            dealId,
                            name,
                            description,
                            actualPrice,
                            minimPrice,
                        });

                        addProduct(product);
                    }}
                >
                    <div className="card-body col-6">
                        <div className="col-12">
                            <label htmlFor="date" className="form-label">
                                Product Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="productName"
                                onChange={(event) => {
                                    event.preventDefault();
                                    const productName = event.target.value;
                                    setName(productName);

                                    setProduct({
                                        dealId,
                                        name,
                                        description,
                                        actualPrice,
                                        minimPrice,
                                    });
                                }}
                            />
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">
                                Product Description
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                id="description"
                                onChange={(event) => {
                                    event.preventDefault();
                                    const productDescrition =
                                        event.target.value;
                                    setDescription(productDescrition);

                                    setProduct({
                                        dealId,
                                        name,
                                        description,
                                        actualPrice,
                                        minimPrice,
                                    });
                                }}
                            ></input>
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
                                Actual price
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                onChange={(event) => {
                                    event.preventDefault();
                                    const pricee = event.target.value;
                                    setActualPrice(pricee);
                                    setProduct({
                                        dealId,
                                        name,
                                        description,
                                        actualPrice,
                                        minimPrice,
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

export default AddProducts;
