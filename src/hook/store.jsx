import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import authRducer from "./auth";
import trainersRducer from "./trainers";
import storage from "redux-persist/lib/storage"; // ✅ دي اللي بتشتغل على الويب (localStorage)

const persistConfig = {
    key: "root",
    version: 1,
    storage: storage,
    
};

const RootReducers = combineReducers({
   auth: authRducer,
trainers:trainersRducer





});

const persistedReducer = persistReducer(persistConfig, RootReducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});