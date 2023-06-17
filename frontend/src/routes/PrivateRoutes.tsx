import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Register from "../pages/register/Register";
import UserCreate from "../pages/user/UserCreate";
import UserEdit from "../pages/user/UserEdit";

const PrivateRoutes: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user/create" element={<UserCreate />} />
            <Route path="/user/edit/:id" element={<UserEdit />} />
        </Routes>
    );
};

export { PrivateRoutes };
