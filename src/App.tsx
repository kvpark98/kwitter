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
import OneTimeLogin from "./routes/one-time-login";
import ResetPassword from "./routes/reset-password";
import ProtectedRouteOneTimeLogin from "./components/protected-route-one-time-login";
import { Container } from "react-bootstrap";
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
    path: "/one-time-login",
    element: (
      <ProtectedRouteOneTimeLogin>
        <OneTimeLogin />
      </ProtectedRouteOneTimeLogin>
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
    <Container>
      <GlobalStyles />
      {isLoading ? <Loading /> : <RouterProvider router={router} />}
    </Container>
  );
}

export default App;
