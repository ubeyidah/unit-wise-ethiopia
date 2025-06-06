import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Link,
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
import StudyHub, { loader as studyHubLoader } from "./pages/app/StudyHub";
import WriteStudyHubPost from "./pages/app/WriteStudyHubPost";
import StudyHubDetail, {
  loader as studyHubDetailLoader,
} from "./pages/app/StudyHubDetail";
import Profile, { loader as profileLoader } from "./pages/app/Profile";
import Posts, { loader as postsLoader } from "./components/Posts";
import Likes, { loader as likeLoader } from "./components/Likes";
import YourFriends from "./components/YourFriends";

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
        <Route
          path="*"
          element={
            <div className="h-screen flex items-center justify-center flex-col gap-4">
              <h1 className="text-3xl font-bold text-green-500 text-center">
                Opps page not found
              </h1>
              <Link to="/dashboard" className="text-blue-600 hover:underline">
                Back To Home
              </Link>
            </div>
          }
        />
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
          <Route
            path="study-hub"
            element={<StudyHub />}
            loader={studyHubLoader}
          />
          <Route path="study-hub/write" element={<WriteStudyHubPost />} />
          <Route
            path="study-hub/:id"
            element={<StudyHubDetail />}
            loader={studyHubDetailLoader}
          />
          <Route
            path="user/:username"
            element={<Profile />}
            loader={profileLoader}
          >
            <Route index element={<Posts />} loader={postsLoader} />
            <Route path="likes" element={<Likes />} loader={likeLoader} />
            <Route path="your-friends" element={<YourFriends />} />
          </Route>
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
