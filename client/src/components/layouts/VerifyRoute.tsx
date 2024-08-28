import { useAuthContext } from "@/context/AuthProvider";
import { Navigate } from "react-router-dom";

const VerifyRoute = () => {
  const auth = useAuthContext();
  if (!auth?.user) {
    return <Navigate to="/signin?message=You must login first" />;
  }
  if (auth.user.isBlock) {
    return <Navigate to="/block" />;
  }
  if (!auth.user.gender || !auth.user.studyType || !auth.user.paymentImage) {
    return <Navigate to="/info" />;
  }
  if (!auth.user.isPaid && auth.user.paymentImage) {
    return <Navigate to="/payment-verify" />;
  }
  if (
    auth?.user &&
    !auth.user.isBlock &&
    auth.user.isPaid &&
    auth.user.studyType &&
    auth.user.paymentImage
  ) {
    return <Navigate to="/dashboard" />;
  }
};

export default VerifyRoute;
