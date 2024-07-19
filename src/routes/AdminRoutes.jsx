import { Outlet, Navigate } from "react-router-dom";

export default function AdminRoutes() {
    return localStorage.getItem('admin-auth-token') ? <Outlet /> : <Navigate to="/account" />
}