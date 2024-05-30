import { Navigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;

  // const [signInMethod, setSignInMethod] = useState("");

  // useEffect(() => {
  //   checkSignInMethod();
  // }, [signInMethod]);

  // const checkSignInMethod = async () => {
  //   if (user) {
  //     const userDocRef = doc(db, "users", user.uid);
  //     const userDocSnap = await getDoc(userDocRef);

  //     if (userDocSnap.exists()) {
  //       const signInMethod = userDocSnap.data().signInMethod;
  //       setSignInMethod(signInMethod);
  //     }
  //   }
  // };

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
