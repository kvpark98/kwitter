import { Alert } from "react-bootstrap";
import GoogleButton from "../../socialSignIn/google-btn";
import GithubButton from "../../socialSignIn/github-btn";

export default function SignUpSocialSignIn() {
  return (
    <div className="w-100">
      <div className="w-100 d-flex justify-content-between align-items-center">
        <span className="w-50 border border-secondary"></span>
        <span className="mx-3">OR</span>
        <span className="w-50 border border-secondary"></span>
      </div>
      <Alert variant="light" className="w-100 mt-3 px-5 py-4">
        <GoogleButton />
        <GithubButton />
      </Alert>
    </div>
  );
}
