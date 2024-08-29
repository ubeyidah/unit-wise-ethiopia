import { useAuthContext } from "@/context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const VerifyRoute = () => {
  const auth = useAuthContext();
  // if (!auth?.user?._id) {
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
  // if (auth?.user?._id) {
  //   return <Navigate to="/dashboard" />;
  // }
  return <Outlet />;
};

export default VerifyRoute;
