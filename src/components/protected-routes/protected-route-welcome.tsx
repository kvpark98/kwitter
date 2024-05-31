import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";

export default function ProtectedRouteWelcome({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;

  if (user !== null) {
    if (user?.emailVerified === true) {
      return <Navigate to="/" />;
    } else {
      return children;
    }
  } else {
    return children;
  }
}
