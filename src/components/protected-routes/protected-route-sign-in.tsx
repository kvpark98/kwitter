import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";

export default function ProtectedRouteSignIn({
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
      return children;
    }
  } else {
    return children;
  }
}
