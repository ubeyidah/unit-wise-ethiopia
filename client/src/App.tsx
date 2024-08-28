import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/landing/Home";
import { ThemeProvider } from "./components/ThemeProvider";
import PublicRoute from "./components/layouts/PublicRoute";
import About from "./pages/landing/About";
import Contact from "./pages/landing/Contact";
import Signin from "./pages/auth/Signin";
import Terms from "./components/policys/Terms";
import Privacy from "./components/policys/Privacy";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<Signin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
