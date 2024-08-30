import { Outlet } from "react-router-dom";
import Header from "../landing/Header";
import Footer from "../landing/Footer";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
