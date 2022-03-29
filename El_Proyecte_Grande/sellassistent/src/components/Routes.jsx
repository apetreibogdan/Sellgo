import React from "react";
import { Route, Switch } from "react-router-dom";

import Pipeline from "../pages/Pipeline";
import Users from "../pages/Users";
import Clients from "../pages/Clients";
import RegisterForm from "./Account/RegisterForm";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Workboard from "../pages/Workboard";
import ClientForm from "./FormsClient/ClientForm";
import ClientProfessionalForm from "./FormsClient/ClientProfessionalForm";
import ClientPersonalForm from "./FormsClient/ClientPersonalForm";
import ClientCareForm from "./FormsClient/ClientCareForm";
import ClientCareDateOfInterest from "./FormsClient/ClientCareDateOfInterest";
import CompanyForm from "./FormsCompany/CompanyForm";
import DealForm from "./FormsDeal/DealForm";
import Home from "./layout/Home";
import AddInterceptionForm from "./FormsDeal/AddInterceptionForm";
import AddProducts from "./FormsDeal/AddProducts";
import DealDetailsForm from "./FormsDeal/DealDetailsForm";
import Profile from "./Account/Profile";

const Routes = () => {
    return (
        <Switch>
            <Route path="/pipeline" component={Pipeline} />
            <Route path="/users" component={Users} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/clients" component={Clients} />
            <Route path="/app" component={App} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/workboard" component={Workboard} />
            <Route path="/home" component={Home} />

            <Route path="/clientform" component={ClientForm} />
            <Route path="/addInterception" component={AddInterceptionForm} />
            <Route path="/addProducts" component={AddProducts} />

            <Route
                path="/clientprofessionalform"
                component={ClientProfessionalForm}
            />
            <Route path="/clientpersonalform" component={ClientPersonalForm} />
            <Route path="/clientcareform" component={ClientCareForm} />
            <Route
                path="/clientcaredateofinterestform"
                component={ClientCareDateOfInterest}
            />
            <Route path="/companyform" component={CompanyForm} />
            <Route path="/dealform" component={DealForm} />
            <Route path="/deal" component={DealDetailsForm} />
            <Route path="/profile" component={Profile} />

            <Route path="/" component={Dashboard} />
        </Switch>
    );
};

export default Routes;
