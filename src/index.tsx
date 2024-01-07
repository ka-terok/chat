import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider } from "react-redux";
import { store } from "./reducer/store";
import Layout from "./features/Layout";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </Provider>
);
