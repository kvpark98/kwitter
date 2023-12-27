import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { isSignInWithEmailLink } from "firebase/auth";
import Header from "../components/header";

export default function Home() {
  const navigate = useNavigate();
  const logOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  console.log("user : " + auth.currentUser);
  console.log("emailVerified : " + auth.currentUser?.emailVerified);
  console.log(
    "isSignInWithEmailLink : " +
      isSignInWithEmailLink(auth, window.location.href)
  );

  return (
    <div className="h-100">
      <Header />
      <h1>
        <button onClick={logOut}>Log Out</button>
      </h1>
    </div>
  );
}
