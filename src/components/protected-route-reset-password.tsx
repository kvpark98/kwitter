import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { isSignInWithEmailLink } from "firebase/auth";

export default function ProtectedRouteResetPassword({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;

  if (isSignInWithEmailLink(auth, window.location.href)) {
    if (window.localStorage.getItem("emailForSignIn") !== null) {
      return children;
    } else {
      return <Navigate to="/sign-in-with-email" />;
    }
  } else {
    if (user !== null) {
      if (user?.emailVerified === true) {
        return <Navigate to="/" />;
      } else {
        return <Navigate to="/sign-in" />;
      }
    } else {
      return <Navigate to="/sign-in" />;
    }
  }
}
