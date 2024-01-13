import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../../firebase";
import { Switcher, Wrapper } from "../../components/styles/auth-components";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header&footer/header";
import Footer from "../../components/header&footer/footer";

export default function DeleteAccount() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [dataRemovalChecked, setDataRemovalChecked] = useState(false);

  const [contentRetentionChecked, setContentRetentionChecked] = useState(false);

  const [rejoiningChecked, setRejoiningChecked] = useState(false);

  const [considerationChecked, setConsiderationChecked] = useState(false);

  const [allChecked, setAllChecked] = useState(false);

  const [password, setPassword] = useState("");

  const [isPassword, setIsPassword] = useState(false);

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [error, setError] = useState("");

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setPassword(value.replace(/\s/gi, ""));

    document
      .getElementById("password")
      ?.classList.remove("form-control-invalid");

    if (value !== "") {
      setIsPassword(true);
    } else {
      setPasswordErrorMessage("");
      setIsPassword(false);
    }
  };

  const noSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  const reset = () => {
    setPassword("");

    setIsPassword(false);

    setPasswordErrorMessage("");

    document
      .getElementById("password")
      ?.classList.remove("form-control-invalid");
  };

  const signOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  useEffect(() => {
    if (
      !dataRemovalChecked ||
      !contentRetentionChecked ||
      !rejoiningChecked ||
      !considerationChecked
    ) {
      setAllChecked(false);
    }
  }, [
    dataRemovalChecked,
    contentRetentionChecked,
    rejoiningChecked,
    considerationChecked,
  ]);

  const agreeDataRemoval = () => {
    setDataRemovalChecked((current) => !current);
    reset();
  };

  const agreeContentRetention = () => {
    setContentRetentionChecked((current) => !current);
    reset();
  };

  const agreeRejoining = () => {
    setRejoiningChecked((current) => !current);
    reset();
  };

  const agreeConsideration = () => {
    setConsiderationChecked((current) => !current);
    reset();
  };

  const agreeAll = () => {
    if (!allChecked) {
      setAllChecked(true);

      if (
        !dataRemovalChecked ||
        !contentRetentionChecked ||
        !rejoiningChecked ||
        !considerationChecked
      ) {
        setDataRemovalChecked(true);
        setContentRetentionChecked(true);
        setRejoiningChecked(true);
        setConsiderationChecked(true);

        reset();
      }
    } else {
      setAllChecked(false);
    }
  };

  console.log("dataRemovalChecked : " + dataRemovalChecked);
  console.log("contentRetentionChecked : " + contentRetentionChecked);
  console.log("rejoiningChecked : " + rejoiningChecked);
  console.log("considerationChecked : " + considerationChecked);
  console.log("allchecked : " + allChecked);

  const deleteAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      isLoading ||
      !isPassword ||
      !dataRemovalChecked ||
      !contentRetentionChecked ||
      !rejoiningChecked ||
      !considerationChecked
    ) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      const credential = EmailAuthProvider.credential(
        auth.currentUser?.email!,
        password
      );

      await reauthenticateWithCredential(auth.currentUser!, credential);

      await deleteUser(auth.currentUser!);

      window.localStorage.setItem("accountDeleted", "true");

      signOut();
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("error : " + error.code);

        window.localStorage.removeItem("accountDeleted");
      }
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Wrapper>
          <div className="mb-2">
            <h1 className="fs-2">Delete Account</h1>
          </div>
          {error && (
            <Alert variant="danger" className="m-0 mt-3 w-100" dismissible>
              <p>
                {(error === "auth/wrong-password" ||
                  error === "auth/invalid-credential") &&
                  "Your password is incorrect."}
                {error === "auth/user-not-found" &&
                  "User not found. Please verify your account and try again."}
                {error === "auth/user-disabled" &&
                  "Account disabled. Please contact support to re-enable your account."}
                {error === "auth/requires-recent-login" &&
                  "Security concern. For this action, recent sign-in is required. Please sign in again."}
                {error === "auth/too-many-requests" &&
                  "Excessive attempts. Please retry after a brief delay."}
                {error === "auth/network-request-failed" &&
                  "An unexpected network error has occurred. Kindly reopen the page."}
                {error === "auth/invalid-user-token" &&
                  "Invalid user token. Please sign in again to obtain a valid token."}
                {error === "auth/web-storage-unsupported" &&
                  "Your browser does not support web storage."}
                {error === "auth/internal-error" &&
                  "An internal error occurred. Please try again later or contact support for assistance."}
                {error === "auth/unknown" &&
                  "An unexpected error occurred. Please try again or contact support."}
              </p>
            </Alert>
          )}
          <Alert variant="light" className="mt-3 py-4 w-100">
            <Form>
              <Form.Group>
                <div>
                  <div className="d-flex mb-5">
                    <div className="me-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-exclamation-triangle text-danger"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                      </svg>
                    </div>
                    <p>
                      Before proceeding with account withdrawal, please take
                      note of the following:
                    </p>
                  </div>
                  <div className="d-flex mb-4">
                    <div className="me-2">
                      <Form.Check
                        onClick={agreeDataRemoval}
                        type="checkbox"
                        id="agreeDataRemoval"
                        readOnly
                        {...(dataRemovalChecked
                          ? { checked: true }
                          : { checked: false })}
                      />
                    </div>
                    <div>
                      <p className="fw-bold mb-3">Data Removal</p>
                      <p>
                        Upon withdrawal, all your personal data, including
                        account details, settings, and usage records, will be
                        permanently deleted from our system.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex mb-4">
                    <div className="me-2">
                      <Form.Check
                        onClick={agreeContentRetention}
                        type="checkbox"
                        id="agreeContentRetention"
                        readOnly
                        {...(contentRetentionChecked
                          ? { checked: true }
                          : { checked: false })}
                      />
                    </div>
                    <div>
                      <p className="fw-bold mb-3">Content Retention</p>
                      <p>
                        Posts and comments you've shared on the bulletin board
                        service will remain even after your account is
                        withdrawn. If you have specific content you wish to
                        delete, please do so before initiating the withdrawal
                        process.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex mb-4">
                    <div className="me-2">
                      <Form.Check
                        onClick={agreeRejoining}
                        type="checkbox"
                        id="agreeRejoining"
                        readOnly
                        {...(rejoiningChecked
                          ? { checked: true }
                          : { checked: false })}
                      />
                    </div>
                    <div>
                      <p className="fw-bold mb-3">Rejoining</p>
                      <p>
                        While you can rejoin later, keep in mind that your
                        previous account data will no longer be available. You
                        will essentially be starting anew.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex mb-5">
                    <div className="me-2">
                      <Form.Check
                        onClick={agreeConsideration}
                        type="checkbox"
                        id="agreeConsideration"
                        readOnly
                        {...(considerationChecked
                          ? { checked: true }
                          : { checked: false })}
                      />
                    </div>
                    <div>
                      <p className="fw-bold mb-3">Consideration</p>
                      <p>
                        We recommend carefully considering the decision to
                        withdraw your account. If there are concerns or issues,
                        reaching out to our support team might provide
                        alternative solutions.
                      </p>
                    </div>
                  </div>
                  <Form.Check
                    onClick={agreeAll}
                    type="checkbox"
                    id="agreeAll"
                    label="I have reviewed all the guidances and agree to them."
                    readOnly
                    {...(allChecked ? { checked: true } : { checked: false })}
                  />
                </div>
              </Form.Group>
            </Form>
            <Switcher className="d-flex justify-content-end">
              <Link to="/" className="btn btn-outline-success">
                Home
              </Link>
            </Switcher>
          </Alert>
          {dataRemovalChecked &&
            contentRetentionChecked &&
            rejoiningChecked &&
            considerationChecked && (
              <Alert variant="light" className="mt-3 px-4 py-4 w-100">
                <Form
                  onSubmit={deleteAccount}
                  className="d-flex flex-column row-gap-3"
                >
                  <Form.Group>
                    <Form.Label htmlFor="password">
                      Kindly input your password for a secure account
                      withdrawal.
                    </Form.Label>
                    <Form.Control
                      className="border-none mt-1 mb-1"
                      onChange={handlePassword}
                      onKeyDown={noSpace}
                      id="password"
                      name="password"
                      value={password}
                      type="password"
                      autoComplete="new-password"
                      maxLength={20}
                    />
                    {!isPassword && passwordErrorMessage && (
                      <div className="mt-2 text-danger">
                        {passwordErrorMessage}
                      </div>
                    )}
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="danger"
                    className="mt-2 fw-bold"
                    {...(!isPassword
                      ? { disabled: true }
                      : { disabled: false })}
                  >
                    {isLoading ? "Loading..." : "Delete Account"}
                  </Button>
                </Form>
                <Switcher className="d-flex justify-content-between">
                  <Button onClick={reset} type="button" variant="outline-info">
                    Reset
                  </Button>
                  <Link to="/" className="btn btn-outline-success">
                    Home
                  </Link>
                </Switcher>
              </Alert>
            )}
        </Wrapper>
        <Footer />
      </div>
    </div>
  );
}
