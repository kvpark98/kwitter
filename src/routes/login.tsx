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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "emailPassword") {
      setEmailPassword(value);
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
      navigate("/");
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
      <div className="d-flex justify-content-between">
        <GoogleButton />
        <GithubButton />
      </div>
    </Wrapper>
  );
}
