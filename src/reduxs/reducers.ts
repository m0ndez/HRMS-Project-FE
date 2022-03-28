import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authentication from "./authentication/reducers";

const persistConfig = {
    key: import.meta.env.VITE_ENVIRONMENT_NAME,
    storage,
    whitelist: ["authentication", 'checkouts'],
}

const authenPersistConfig = {
    key: "authentication",
    storage,
};

const rootReducer = {
    authentication: persistReducer(authenPersistConfig, authentication),
}

export default persistReducer(persistConfig, combineReducers(rootReducer))