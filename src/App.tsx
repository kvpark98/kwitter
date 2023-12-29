import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import "bootstrap/dist/css/bootstrap.min.css";
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
  html,
  body {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: Arial, Helvetica, sans-serif !important;
  }
  .wrap {
    position: relative;
    min-height: 100%;
    padding-bottom: 200px;
  }
  .alert-dismissible .btn-close {
    padding: 16px;
  }
  .form-check-input {
    margin-top: 0;
  }
  .form-control-invalid {
    background-image: url("/invalid.svg");
    background-position: right calc(0.375em + 0.1875rem) center;
    background-repeat: no-repeat;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    border-color: var(--bs-form-invalid-border-color);
    padding-right: calc(1.5em + 0.75rem);
  }
  .form-control-invalid:focus {
    color: var(--bs-body-color);
    background-color: var(--bs-body-bg);
    border-color: #dc3545;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(253, 13, 13, 0.25);
  }
  .form-control-valid {
    background-image: url("/valid.svg");
    background-position: right calc(0.375em + 0.1875rem) center;
    background-repeat: no-repeat;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    border-color: var(--bs-form-valid-border-color);
    padding-right: calc(1.5em + 0.75rem);
  }
  .form-control-valid:focus {
    color: var(--bs-body-color);
    background-color: var(--bs-body-bg);
    border-color: #75b798;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(1, 79, 18, 0.25);
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
