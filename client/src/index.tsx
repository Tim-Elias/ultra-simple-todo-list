import { Root } from "./root";
import { store, persistor } from "./store/appStore";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
    <Root store={store} persistor={persistor} />
);