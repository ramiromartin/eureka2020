import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reduxSaga from "redux-saga";

const middleware = [thunk, logger, reduxSaga()];

const store = createStore(
  reducers,

  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
