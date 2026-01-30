import React from "react";
import ReactDOM from "react-dom/client";

// import { PublicClientApplication } from "@azure/msal-browser";
// import { MsalProvider } from "@azure/msal-react";

// import App from "./App.tsx";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import FabricDemo from "./FabricDemo";
import "./index.css";
import "@moneydevkit/replit/mdk-styles.css";

// import { msalConfig } from "./AuthConfig";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// const pca = new PublicClientApplication(msalConfig);

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/app",
        element: <Dashboard />
    },
    {
        path: "/demo",
        element: <FabricDemo />
    }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        {/* <MsalProvider instance={pca}> */}
        <RouterProvider router={router} />
        {/* </MsalProvider> */}
    </React.StrictMode>
);
