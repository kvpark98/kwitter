import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./routes/home";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import Loading from "./components/loading/loading";
import { auth } from "./firebase";
import Profile from "./routes/profile";
import Account from "./routes/account";
import Welcome from "./routes/welcome";
import ProtectedRouteProfileAccount from "./components/protected-routes/protected-route-profile-account";
import ProtectedRouteHome from "./components/protected-routes/protected-route-home";
import ProtectedRouteWelcome from "./components/protected-routes/protected-route-welcome";

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  html,
  body {
      background-color:  #E6E6FA;
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
    background-color: #055160;
  }
  .translate-middle-add {
    transform: translate(-120%, -50%) !important;
  }
  .translate-middle-remove {
    transform: translate(20%, -50%) !important;
  }
`;

const router = createBrowserRouter([
  {
    path: "/welcome",
    element: (
      <ProtectedRouteWelcome>
        <Welcome />
      </ProtectedRouteWelcome>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRouteHome>
        <Home />
      </ProtectedRouteHome>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRouteProfileAccount>
        <Profile />
      </ProtectedRouteProfileAccount>
    ),
  },
  {
    path: "/account",
    element: (
      <ProtectedRouteProfileAccount>
        <Account />
      </ProtectedRouteProfileAccount>
    ),
  },
]);

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
