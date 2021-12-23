import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { authTokenMiddleWare } from "./sagas";
import createSagaMiddleware from "redux-saga";

import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";
import dataReducer from "./reducers/dataReducer";
import studioReducer from "../features/dashboard/features/studio/reducers";
import mealsReducer from "../features/dashboard/features/meals/reducers";
import storeReducer from "../features/dashboard/features/store/reducers";
import chatReducer from "../features/dashboard/features/chat/reducers";
import dashboardReducer from "../features/dashboard/reducers";

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware];

const reducers = combineReducers({
    chat: chatReducer,
    data: dashboardReducer,
    meals: mealsReducer,
    store: storeReducer,
    studio: studioReducer,
    user: userReducer,
    ui: uiReducer,
});

const store = createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f) => f
    )
);
sagaMiddleware.run(authTokenMiddleWare);
export default store;
