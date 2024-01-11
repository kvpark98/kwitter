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

export default function DeleteUSer() {
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

    if (value !== "") {
      setIsPassword(true);

      document
        .getElementById("password")
        ?.classList.remove("form-control-invalid");
    } else {
      setPasswordErrorMessage("");
      setIsPassword(false);

      document
        .getElementById("password")
        ?.classList.remove("form-control-invalid");
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
      }
    } else {
      setAllChecked(false);
    }
    reset();
  };

  console.log("dataRemovalChecked : " + dataRemovalChecked);
  console.log("contentRetentionChecked : " + contentRetentionChecked);
  console.log("rejoiningChecked : " + rejoiningChecked);
  console.log("considerationChecked : " + considerationChecked);
  console.log("allchecked : " + allChecked);

  const deleteAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (password === "") {
        setPasswordErrorMessage("please enter your password.");
        setIsPassword(false);

        document
          .getElementById("password")
          ?.classList.add("form-control-invalid");
      }

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

      setIsLoading(true);

      // 비밀번호 재인증
      const credential = EmailAuthProvider.credential(
        auth.currentUser?.email!,
        password
      );
      await reauthenticateWithCredential(auth.currentUser!, credential);

      // 사용자 삭제
      await deleteUser(auth.currentUser!);

      // 로컬 스토리지에 삭제 완료 여부 저장 (클라이언트 측에서의 사용은 제한적이므로 주의)
      window.localStorage.setItem("accountDeleted", "true");

      // 로그아웃
      signOut();
    } catch (error) {
      // 에러 코드에 따라 세부적인 처리를 추가할 수 있음
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.error("Error deleting account:", error.code);
        window.localStorage.removeItem("accountDeleted");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // console.log("user : " + auth.currentUser);
  // console.log("emailVerified : " + auth.currentUser?.emailVerified);

  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <Wrapper>
          <div className="w-100 mb-1 d-flex justify-content-center">
            <h1 className="fs-2">Delete your account</h1>
          </div>
          {error && (
            <Alert
              variant="danger"
              className="d-flex align-itmes-center m-0 mt-3 w-100"
              dismissible
            >
              <p>
                <span>
                  {error === "auth/wrong-password" &&
                    "Your password is not correct."}
                  {error === "auth/invalid-credential" && "Incorrect password."}
                  {error === "auth/user-disabled" &&
                    "The user corresponding to the given email has been disabled."}
                  {error === "auth/invalid-action-code" &&
                    "The link is malformed or has already been used. Please get a new link."}
                  {error === "auth/user-not-found" &&
                    "There is no user corresponding to the given email."}
                  {error === "auth/too-many-requests" &&
                    "Too many attempts. Please try again after some delay."}
                  {error === "auth/account-exists-with-different-credential" &&
                    "Email is invalid or already taken."}
                  {error === "auth/network-request-failed" &&
                    "A network error has occurred. Please reopen the page."}
                  {error === "auth/requires-recent-login" &&
                    "This requires recent sign-in. Please sign in again."}
                  {error === "auth/invalid-user-token" &&
                    "Your credential is no longer valid. Please sign in again."}
                  {error === "auth/user-token-expired" &&
                    "Your credential has expired. Please sign in again."}
                  {error === "auth/web-storage-unsupported" &&
                    "Your browser does not support web storage. Please try again."}
                </span>
              </p>
            </Alert>
          )}
          <Alert variant="light" className="mt-3 py-4 w-100">
            <Form>
              <Form.Group>
                <div>
                  <div className="d-flex mb-5">
                    <div className="me-3">❗</div>
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
          </Alert>
          {dataRemovalChecked &&
            contentRetentionChecked &&
            rejoiningChecked &&
            considerationChecked && (
              <Alert variant="light" className="mt-3 py-4 w-100">
                <Form
                  onSubmit={deleteAccount}
                  className="d-flex"
                  style={{
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <Form.Group>
                    <Form.Label htmlFor="password">
                      Please enter your password to securely withdraw your
                      account.
                    </Form.Label>
                    <Form.Control
                      className="border-none mt-1 mb-1"
                      onChange={handlePassword}
                      onKeyDown={noSpace}
                      id="password"
                      name="password"
                      value={password}
                      type="password"
                      maxLength={50}
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
                  >
                    {isLoading ? "Loading..." : "Delete"}
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

          {/* Error Modal
        <Modal
          show={showErrorModal}
          onHide={handleCloseErrorModal}
          backdrop="static"
          keyboard={false}
        >
          <Alert variant="danger" className="m-0 p-0">
            <Modal.Body>
              <Alert.Heading className="mb-3">Error</Alert.Heading>
              <p>
                <span>
                  {error === "auth/invalid-login-credentials" &&
                    "Incorrect email or password."}
                  {error === "auth/requires-recent-login" &&
                    "This requires recent sign-in. Please sign in again."}
                  {error === "auth/network-request-failed" &&
                    "A network error has occurred. Please reopen the page."}
                  {error === "auth/invalid-user-token" &&
                    "Your credential is no longer valid. Please sign in again."}
                  {error === "auth/user-token-expired" &&
                    "Your credential has expired. Please sign in again."}
                  {error === "auth/web-storage-unsupported" &&
                    "Your browser does not support web storage. Please try again."}
                </span>
              </p>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0 p-3">
              <Button variant="outline-dark" onClick={handleCloseErrorModal}>
                Close
              </Button>
              <Button variant="outline-primary" onClick={goBackModal}>
                Back
              </Button>
            </Modal.Footer>
          </Alert>
        </Modal> */}
        </Wrapper>
        <Footer />
      </div>
    </div>
  );
}
