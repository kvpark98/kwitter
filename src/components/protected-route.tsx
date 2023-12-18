import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  // if (user?.emailVerified === false) {
  //   return <Navigate to="/login" />;
  // }
  if (user !== null) {
    if (user?.emailVerified === true) {
      return children;
    } else {
      return <Navigate to="/sign-in" />;
    }
  } else {
    return <Navigate to="/sign-in" />;
  }
}
