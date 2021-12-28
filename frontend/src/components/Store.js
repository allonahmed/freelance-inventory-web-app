import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userReducer from "../features/user";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  // configs object for pepsist reducer
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer); // wrap reducer inside persistReducer

const store = configureStore({
  // inititalize our store
  reducer: {
    user: persistedReducer, // our persisted reducer
  },
  middleware: getDefaultMiddleware({
    //middleware to prevent serializable errors
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export default store;
