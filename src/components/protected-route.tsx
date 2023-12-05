import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  console.log(user?.emailVerified);
  // if (user?.emailVerified === false) {
  //   return <Navigate to="/login" />;
  // }
  if (user !== null) {
    if (user?.emailVerified === true) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
}
