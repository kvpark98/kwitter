import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { isSignInWithEmailLink } from "firebase/auth";

export default function ProtectedRouteConfirm({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;

  if (isSignInWithEmailLink(auth, window.location.href)) {
    return children;
  } else {
    if (user === null) {
      return <Navigate to="/login" />;
    } else {
      return <Navigate to="/" />;
    }
  }
}
