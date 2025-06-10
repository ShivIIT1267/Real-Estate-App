import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser, loading } = useSelector((state) => state.user);

  if (loading) {
    return <div>Loading...</div>; // or your loading component
  }

  return currentUser ? <Outlet /> : <Navigate to="/signin" replace />;
}
