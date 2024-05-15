import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { isSignInWithEmailLink } from "firebase/auth";

export default function ProtectedRouteSignInWithEmail({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;

  if (user !== null) {
    if (user?.emailVerified === true) {
      if (window.sessionStorage.getItem("isSignedInWithEmail")) {
        return <Navigate to="/reset-password" />;
      } else {
        return <Navigate to="/" />;
      }
    } else {
      return <Navigate to="/welcome" />;
    }
  } else {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      return children;
    } else {
      return <Navigate to="/welcome" />;
    }
  }
}
