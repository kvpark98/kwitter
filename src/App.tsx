import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import SignIn from "./routes/sign-in";
import SignUp from "./routes/sign-up";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import Loading from "./components/loading";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";
import "./App.module.css";
import ProtectedRouteLogin from "./components/protected-route-login";
import ResetPassword from "./routes/reset-password";
import SendSignInLink from "./routes/send-sign-in-link";
import SignInWithEmail from "./routes/sign-in-with-email";
import ProtectedRouteSignInWithEmail from "./components/protected-route-sign-in-with-email";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: (
      <ProtectedRouteLogin>
        <SignIn />
      </ProtectedRouteLogin>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <ProtectedRouteLogin>
        <SignUp />
      </ProtectedRouteLogin>
    ),
  },
  {
    path: "/send-sign-in-link",
    element: (
      <ProtectedRouteLogin>
        <SendSignInLink />
      </ProtectedRouteLogin>
    ),
  },
  {
    path: "/sign-in-with-email",
    element: (
      <ProtectedRouteSignInWithEmail>
        <SignInWithEmail />
      </ProtectedRouteSignInWithEmail>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <ProtectedRoute>
        <ResetPassword />
      </ProtectedRoute>
    ),
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .alert-dismissible .btn-close {
    padding: 16px;
  }
  .form-check-input {
    margin-top: 0;
  }
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="h-100">
      <GlobalStyles />
      {isLoading ? <Loading /> : <RouterProvider router={router} />}
    </div>
  );
}

export default App;
