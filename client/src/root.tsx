import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor } from "redux-persist/es/types";
import { App } from "./App";

export interface IRootProps {
  store: any;
  persistor: Persistor;
}

export function Root({ store, persistor }: IRootProps) {
  return (
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            <App />
          </Provider>
      </PersistGate>
    </React.StrictMode>
  );
}
