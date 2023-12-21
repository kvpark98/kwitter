import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRouteLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  if (
    user === null ||
    user?.emailVerified === undefined ||
    user?.emailVerified === false
  ) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
