import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authentication from "./authentication/reducers";
import { loader } from "./loader/reducer";
const persistConfig = {
    key: import.meta.env.VITE_ENVIRONMENT_NAME,
    storage,
    whitelist: ["authentication"],
}

const authenPersistConfig = {
    key: "authentication",
    storage,
};

const rootReducer = {
    authentication: persistReducer(authenPersistConfig, authentication),
    loader
}

export default persistReducer(persistConfig, combineReducers(rootReducer))