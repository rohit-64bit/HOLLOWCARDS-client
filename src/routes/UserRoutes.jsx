import { Outlet, Navigate } from "react-router-dom";

export default function UserRoutes() {
    return localStorage.getItem('auth-token') ? <Outlet /> : <Navigate to="/account" />
}