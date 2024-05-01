// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./rootReducer";

// export const store = configureStore({
//   rootReducer
// });


// // export const store = createStore(
// //   rootReducer,
// //   composeWithDevTools(applyMiddleware(thunk))
// // )

// export const persistor = persistStore(store);

// const logger = {
//   store, persistor
// };

// export const persistor = persistStore(store);

// const logger = {
//     store, persistor
// };

// export default logger;

import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer, persistStore } from 'redux-persist'
import authReducer from './Auth/reducer';
// import thunk from 'redux-thunk'

const reducers = combineReducers({
  auth: authReducer,         
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
    reducer: persistedReducer,
    // devTools: process.env.NODE_ENV !== 'production',
    // middleware: [thunk]
});

export default store;

export const persistor = persistStore(store);





