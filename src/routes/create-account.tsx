import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Error,
  Forms,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";
import GoogleButton from "../components/google-btn";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import styles from "../App.module.css";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [validated, setValidated] = useState(false);

  const logOut = () => {
    auth.signOut();
    navigate("/login");
  };

  const [show, setShow] = useState(false);
  const handleClose = async () => {
    setShow(false);
    logOut();
  };
  const handleShow = () => setShow(true);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === "name") {
      setName(value.replace(/\s/gi, ""));
    } else if (name === "email") {
      setEmail(value.replace(/\s/gi, ""));
    } else if (name === "password") {
      setPassword(value.replace(/\s/gi, ""));
    }
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    setError("");

    if (isLoading || name === "" || email === "" || password === "") {
      return;
    }

    try {
      setIsLoading(true);

      // Create an account
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);

      // Verify email
      await sendEmailVerification(credentials.user);

      // Update the profile
      await updateProfile(credentials.user, {
        displayName: name,
      });

      // Pop up modal
      handleShow();
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
    console.log(name, email, password);
  };
  return (
    <Wrapper>
      <Title>Join 〽</Title>
      {/* <Forms onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          maxLength={20}
          required
        />
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
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Forms> */}
      <Form
        noValidate
        validated={validated}
        onSubmit={onSubmit}
        style={{
          width: "100%",
          marginTop: "50px",
          marginBottom: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Form.Group controlId="validationName">
          <Form.Control
            style={{
              width: "100%",
              borderRadius: "50px",
              border: "none",
            }}
            required
            onChange={onChange}
            name="name"
            value={name}
            type="text"
            placeholder="Name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter your name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationEmail">
          <Form.Control
            style={{
              width: "100%",
              borderRadius: "50px",
              border: "none",
            }}
            required
            onChange={onChange}
            name="email"
            value={email}
            type="email"
            placeholder="Email"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter your email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationPassword">
          <Form.Control
            style={{
              width: "100%",
              borderRadius: "50px",
              border: "none",
            }}
            required
            onChange={onChange}
            name="password"
            value={password}
            type="password"
            placeholder="Password"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter your password.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Create Account</Button>
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        <Link to="/login">Login &rarr;</Link>
      </Switcher>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="border-0"></Modal.Header>
        <Modal.Body>
          <span className="text-dark">
            Please confirm your email to continue.
          </span>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="primary" onClick={handleClose}>
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
