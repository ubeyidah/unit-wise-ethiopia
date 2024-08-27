import { Navigate, Outlet } from "react-router-dom";
import Header from "../landing/Header";
import Footer from "../landing/Footer";

const PublicRoute = () => {
  const isLoggedin = false;
  if (isLoggedin) return <Navigate to="/dashboard" />;
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicRoute;
