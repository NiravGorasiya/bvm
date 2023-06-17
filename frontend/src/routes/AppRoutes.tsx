import { FC } from "react";

import { PrivateRoutes } from "./PrivateRoutes";
import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar"
import { Box } from "@mui/material";
import "../styles.css"
import { PublicRoutes } from "./PublicRoutes";
import { Navigate } from "react-router-dom";

const AppRoutes: FC = () => {
    const token = localStorage.getItem("token")

    return (
        <div>
            {
                token ? (
                    <>
                        <Sidebar />
                        <Header />
                        <Box className="wrapper">
                            <PrivateRoutes />
                        </Box>
                    </>
                ) : (
                    <>
                        <Navigate to="/login" />
                        <PublicRoutes />
                    </>
                )
            }
        </div>
    );
};

export { AppRoutes };
