import ThemeReducer from "./Theme/ThemeReducer";
import UserReducer from "./Users/UserReducer";
import AuthReducer from "./Authentication/AuthReducer";
import AuthErrorReducer from "./Authentication/AuthErrorReducer";
import CompanyReducer from "./Companies/CompanyReducer";
import DealReducer from "./Deals/DealReducer";
import ProductReducer from "./Products/ProductReducer";
import ClientReducer from "./Clients/ClientReducer";
import InterceptionReducer from "./Interceptions/InterceptionReducer";
import ClientPersonalApproachReducer from "./ClientPersonalApproach/ClientPersonalApproachReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    themeRedux: ThemeReducer,
    userRedux: UserReducer,
    authRedux: AuthReducer,
    authStat: AuthReducer,
    authError: AuthErrorReducer,
    companiesRedux: CompanyReducer,
    dealsRedux: DealReducer,
    productsRedux: ProductReducer,
    clientsRedux: ClientReducer,
    interceptionsRedux: InterceptionReducer,
    personalapproach: ClientPersonalApproachReducer,
});

export default rootReducer;
