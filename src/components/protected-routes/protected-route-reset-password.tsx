import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";

export default function ProtectedRouteResetPassword({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;

  if (user !== null) {
    if (user?.emailVerified === true) {
      if (window.sessionStorage.getItem("isSignedInWithEmail")) {
        return children;
      } else {
        return <Navigate to="/" />;
      }
    } else {
      return <Navigate to="/sign-in" />;
    }
  } else {
    return <Navigate to="/sign-in" />;
  }
}
