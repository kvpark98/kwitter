import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";

export default function ProtectedRouteHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;

  if (user !== null) {
    if (user?.emailVerified === true) {
      return children;
    } else {
      return <Navigate to="/welcome" />;
    }
  } else {
    return <Navigate to="/welcome" />;
  }
}
