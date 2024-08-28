import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/landing/Home";
import PublicRoute from "./components/layouts/PublicRoute";
import About from "./pages/landing/About";
import Contact from "./pages/landing/Contact";
import Signin from "./pages/auth/Signin";
import Terms from "./components/policys/Terms";
import Privacy from "./components/policys/Privacy";
import { Toaster } from "@/components/ui/sonner";
import { useAuthContext } from "./context/AuthProvider";
import Loading from "./components/loading";
import PrivateRoute from "./components/layouts/PrivateRoute";
import Block from "./pages/Block";
import PaymentVerify from "./pages/PaymentVerify";
import MoreInfo from "./pages/MoreInfo";
import Dashboard from "./pages/app/Dashboard";
import VerifyRoute from "./components/layouts/VerifyRoute";

const App = () => {
  const auth = useAuthContext();
  if (auth?.loading) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        {/* public routes */}
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signin" element={<Signin />} />
        </Route>

        {/* protected routes */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
        </Route>

        {/* verify routes */}
        <Route element={<VerifyRoute />}>
          <Route path="/block" element={<Block />} />
          <Route path="/payment-verify" element={<PaymentVerify />} />
          <Route path="/info" element={<MoreInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
