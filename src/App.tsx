import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Layout from "./components/styles/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./routes/home";
import SignIn from "./routes/auth/sign-in";
import SignUp from "./routes/auth/sign-up";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import Loading from "./components/loading/loading";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-routes/protected-route";
import ResetPassword from "./routes/auth/reset-password";
import SendSignInLink from "./routes/auth/send-sign-in-link";
import SignInWithEmail from "./routes/auth/sign-in-with-email";
import ProtectedRouteSignInWithEmail from "./components/protected-routes/protected-route-sign-in-with-email";
import ProtectedRouteResetPassword from "./components/protected-routes/protected-route-reset-password";
import DeleteAccount from "./routes/auth/delete-account";
import ProtectedRouteSignIn from "./components/protected-routes/protected-route-sign-in";
import Profile from "./routes/profile";
import Account from "./routes/account/account";

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
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/account/delete-account",
        element: <DeleteAccount />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: (
      <ProtectedRouteSignIn>
        <SignIn />
      </ProtectedRouteSignIn>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <ProtectedRouteSignIn>
        <SignUp />
      </ProtectedRouteSignIn>
    ),
  },
  {
    path: "/send-sign-in-link",
    element: (
      <ProtectedRouteSignIn>
        <SendSignInLink />
      </ProtectedRouteSignIn>
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
      <ProtectedRouteResetPassword>
        <ResetPassword />
      </ProtectedRouteResetPassword>
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
  #scrollToTop {
    background-color: #0d6efd;
    color: #f7f7fa;
  }
  #scrollToBottom {
    background-color: #198754;
    color: #f7f7fa;
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
  .dropstart .dropdown-toggle::before {
    display: none
  }
  .card-img-top {
    border-top-left-radius: 0;
    border-top-right-radius: var(--bs-card-inner-border-radius);
  }
  .dropdown-toggle::after {
    display: none;
  }
  .nav-pills .nav-link.active, .nav-pills .show>.nav-link {
    color: var(--bs-nav-pills-link-active-color);
    background-color: #212529;
  }
  .translate-middle-add {
    transform: translate(-120%, -50%) !important;
  }
  .translate-middle-remove {
    transform: translate(20%, -50%) !important;
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
