import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { isSignInWithEmailLink } from "firebase/auth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  if (user !== null) {
    if (
      user?.emailVerified === true &&
      !isSignInWithEmailLink(auth, window.location.href)
    ) {
      return children;
    } else {
      return <Navigate to="/sign-in" />;
    }
  } else {
    return <Navigate to="/sign-in" />;
  }
}
