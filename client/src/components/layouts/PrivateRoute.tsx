import { useAuthContext } from "@/context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = useAuthContext();
  // if (!auth?.user) {
  //   return <Navigate to="/signin?message=You must login first" />;
  // }
  // if (auth.user.isBlock) {
  //   return <Navigate to="/block" />;
  // }
  // if (!auth.user.gender || !auth.user.studyType || !auth.user.paymentImage) {
  //   return <Navigate to="/info" />;
  // }
  // if (!auth.user.isPaid && auth.user.paymentImage) {
  //   return <Navigate to="/payment-verify" />;
  // }
  return <Outlet />;
};

export default PrivateRoute;
