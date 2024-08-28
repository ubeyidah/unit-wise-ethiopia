import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../landing/Header";
import Footer from "../landing/Footer";
import { useAuthContext } from "@/context/AuthProvider";

const PublicRoute = () => {
  const auth = useAuthContext();
  const { pathname } = useLocation();

  if (
    auth?.user &&
    !auth.user.isBlock &&
    auth.user.isPaid &&
    auth.user.studyType &&
    auth.user.paymentImage
  ) {
    return <Navigate to="/dashboard" />;
  }
  if (pathname.startsWith("/signin") && auth?.user?._id) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicRoute;
