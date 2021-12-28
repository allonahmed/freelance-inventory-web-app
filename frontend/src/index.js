import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux"; //makes the Redux store available to any nested components that need to access the Redux store
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import store from "./components/Store";
import { BrowserRouter } from "react-router-dom";

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
