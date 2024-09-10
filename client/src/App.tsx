import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/landing/Home";
import About from "./pages/landing/About";
import Contact from "./pages/landing/Contact";
import Signin from "./pages/auth/Signin";
import Terms from "./components/policys/Terms";
import Privacy from "./components/policys/Privacy";
import { Toaster } from "@/components/ui/sonner";
import { useAuthContext } from "./context/AuthProvider";
import Loading from "./components/loading";
import Block from "./pages/Block";
import PaymentVerify from "./pages/PaymentVerify";
import MoreInfo from "./pages/MoreInfo";
import Dashboard from "./pages/app/Dashboard";
import ErrorPage from "./components/ErrorPage";
import {
  requireAuth,
  requireBlockRoute,
  requirePaymentVerify,
  requirePublicRoute,
  requireSignInRoute,
  requireTakeMoreInfo,
} from "./lib/auth";
import PublicLayout from "./components/layouts/PublicLayout";
import DashoardLayout from "./components/layouts/DashoardLayout";
import Subjects, { loader as subjectLoader } from "./pages/app/Subjects";
import SubjectDetail, {
  loader as subjectDetailLoader,
} from "./pages/app/SubjectDetail";
import StudyHub from "./pages/app/StudyHub";
import WriteStudyHubPost from "./pages/app/WriteStudyHubPost";

const App = () => {
  const auth = useAuthContext();
  if (auth?.loading) {
    return <Loading />;
  }
  if (auth?.error) {
    return <ErrorPage />;
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* public route */}

        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<Privacy />} />

        {/* only not logged in user can hit */}

        <Route
          loader={() => {
            requirePublicRoute(auth?.user);
            return null;
          }}
          element={<PublicLayout />}
          path="/"
        >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* auth route */}
        <Route element={<PublicLayout />}>
          <Route
            path="/signin"
            element={<Signin />}
            loader={() => {
              requireSignInRoute(auth?.user);
              return null;
            }}
          />
        </Route>

        {/* protected route */}

        <Route
          loader={() => {
            requireAuth(auth?.user);
            return null;
          }}
          element={<DashoardLayout />}
          path="/dashboard"
        >
          <Route index element={<Dashboard />} />
          <Route
            path="subjects"
            element={<Subjects />}
            loader={subjectLoader}
          />
          <Route
            path="subjects/:subject"
            element={<SubjectDetail />}
            loader={subjectDetailLoader}
          />
          <Route path="study-hub" element={<StudyHub />} />
          <Route path="study-hub/write" element={<WriteStudyHubPost />} />
        </Route>

        {/* verification routes */}
        <Route
          path="/take-info"
          element={<MoreInfo />}
          loader={() => requireTakeMoreInfo(auth?.user)}
        />
        <Route
          path="/block"
          element={<Block />}
          loader={() => requireBlockRoute(auth?.user)}
        />
        <Route
          path="/payment-verify"
          element={<PaymentVerify />}
          loader={() => requirePaymentVerify(auth?.user)}
        />
      </>
    )
  );
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
