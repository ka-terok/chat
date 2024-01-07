import { createBrowserRouter } from "react-router-dom";
import Chat from "./pages/Chat";
import HomePage from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:id",
    element: <Chat />,
  },
]);
