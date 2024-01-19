import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { auth, db } from "../firebase";
import { FirebaseError } from "firebase/app";
import { Switcher } from "./styles/auth-components";

export default function PostTweetForm() {
  const user = auth.currentUser;

  const [isLoading, setIsLoading] = useState(false);

  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [isTweet, setIsTweet] = useState(false);

  const [error, setError] = useState("");

  const [postUploaded, setPostUploaded] = useState(false);

  const handleTweet = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;

    setTweet(event.currentTarget.value);

    if (value !== "") {
      setIsTweet(true);
    } else {
      setIsTweet(false);
    }
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  const reset = () => {
    setTweet("");

    setIsTweet(false);
  };

  const postTweet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || !isTweet || tweet.length > 180 || !user) {
      return;
    }

    try {
      setIsLoading(true);

      await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });

      setPostUploaded(true);

      reset();
    } catch (error) {
      setPostUploaded(false);
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log(error.code);
      }
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-100">
      {postUploaded && (
        <Alert variant="success" className="m-0 mt-3 w-100" dismissible>
          <p>Tweet successfully posted!</p>
        </Alert>
      )}
      {error && (
        <Alert variant="danger" className="m-0 mt-3 w-100" dismissible>
          <p>
            {error === "permission-denied" &&
              "Access Denied. You lack the necessary permissions to add a document."}
            {error === "resource-exhausted" &&
              "Resource Limit Exceeded. The operation could not be completed due to resource constraints."}
            {error === "invalid-argument" &&
              "Invalid Argument. Ensure that the data you are attempting to add is correctly formatted."}
            {error === "unknown" &&
              "Unexpected Error. An unexpected error occurred. Please try again later."}
            {error === "auth/invalid-display-name" &&
              "Invalid display name. Please provide a valid name."}
            {error === "auth/invalid-photo-url" &&
              "Invalid photo URL. Please provide a valid URL for your profile picture."}
            {error === "auth/user-not-found" &&
              "User not found. Please verify your account and try again."}
            {error === "auth/user-disabled" &&
              "Account disabled. Please contact support to re-enable your account."}
            {error === "auth/too-many-requests" &&
              "Excessive attempts. Please retry after a brief delay."}
            {error === "auth/network-request-failed" &&
              "An unexpected network error has occurred. Kindly reopen the page."}
            {error === "auth/web-storage-unsupported" &&
              "Your browser does not support web storage."}
            {error === "auth/internal-error" &&
              "An internal error occurred. Please try again later or contact support for assistance."}
            {error === "auth/unknown" &&
              "An unexpected error occurred. Please try again or contact support."}
          </p>
        </Alert>
      )}
      <Alert variant="light" className="mt-3 px-4 py-4 w-100">
        <Form className="w-100" onSubmit={postTweet}>
          <Form.Group>
            <Form.Control
              as="textarea"
              onChange={handleTweet}
              value={tweet}
              rows={5}
              maxLength={180}
              className="mb-4"
              style={{ resize: "none" }}
              placeholder="What is happening?"
            />
            <Form.Label
              htmlFor="file"
              className="btn btn-outline-secondary mb-4 w-100"
            >
              {file ? "Photo Added ✅" : "Add Photo"}
            </Form.Label>
            <Form.Control
              onChange={handleFile}
              type="file"
              id="file"
              className="d-none"
              accept="image/*"
            />
            <Button type="submit" variant="primary" className="w-100 fw-bold">
              {isLoading ? "Posting..." : "Post Tweet"}
            </Button>
          </Form.Group>
        </Form>
        <Switcher className="d-flex justify-content-between">
          <Button onClick={reset} type="button" variant="outline-info">
            Reset
          </Button>
        </Switcher>
      </Alert>
    </div>
  );
}
