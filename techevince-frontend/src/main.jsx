import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "virtual:fonts.css";
import Home from "./routes/home";
import ErrorPage from "./routes/error-page";
import TopPart from "./components/top-part";
import BottomPart from "./components/bottom-part";
import HardwareInfo from "./routes/hardware-info";
import SoftwareInfo from "./routes/software-info";
import BusinessInfo from "./routes/business-info";
import HardwareVote from "./routes/hardware-vote";
import BusinessVote from "./routes/business-vote";
import SoftwareVote from "./routes/software-vote";
import Redirect from "./routes/redirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/hardware",
    element: <HardwareInfo />,
  },
  {
    path: "/software",
    element: <SoftwareInfo/>,
  },
  {
    path: "/business",
    element: <BusinessInfo/>,
  },
  {
    path: "/vote-hardware",
    element: <HardwareVote/>
  },
  {
    path: "/vote-software",
    element: <SoftwareVote/>
  },
  {
    path: "/vote-business",
    element: <BusinessVote/>
  },
  {
    path: "/redirect",
    element: <Redirect />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
