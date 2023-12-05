import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import {
  Error,
  Forms,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import GoogleButton from "../components/google-btn";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [error, setError] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    if (emailPassword) {
      setShow2(true);
      handleClose();
    }
  };

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value.replace(/\s/gi, ""));
    } else if (name === "password") {
      setPassword(value.replace(/\s/gi, ""));
    } else if (name === "emailPassword") {
      setEmailPassword(value.replace(/\s/gi, ""));
    }
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") {
      return;
    }
    try {
      setIsLoading(true);
      // Log in
      await signInWithEmailAndPassword(auth, email, password);

      // Ridirect to the home page
      if (auth.currentUser?.emailVerified === true) {
        navigate("/");
      } else {
        handleShow3();
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
    console.log(email, password);
  };

  const findPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailPassword === "") return;
    try {
      await sendPasswordResetEmail(auth, emailPassword);
      handleShow2();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(auth.currentUser?.emailVerified);
  return (
    <Wrapper>
      <Title>Log into 〽</Title>
      <Forms onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          maxLength={20}
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
      </Forms>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        <div>
          <Link to="/create-account">Create account &rarr;</Link>
        </div>
        <div>
          <Button variant="link" onClick={handleShow}>
            Forgot my password
          </Button>
        </div>
      </Switcher>
      {/* Modal 1 */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="border-0"></Modal.Header>
        <Form onSubmit={findPassword}>
          <Modal.Body>
            <Form.Control
              required
              onChange={onChange}
              name="emailPassword"
              type="email"
              placeholder="Email"
            ></Form.Control>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* Modal 2 */}
      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="border-0"></Modal.Header>
        <Modal.Body>
          <span className="text-dark">
            Please check your email to reset your password.
          </span>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal 3 */}
      <Modal
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="border-0"></Modal.Header>
        <Modal.Body>
          <span className="text-dark">
            You cannot login until you confirm your email.
          </span>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={handleClose3}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex justify-content-between">
        <GoogleButton />
        <GithubButton />
      </div>
    </Wrapper>
  );
}
