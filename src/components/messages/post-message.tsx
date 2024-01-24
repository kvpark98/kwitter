import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Alert, Button, ButtonGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { auth, db, storage } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function PostMessage() {
  const user = auth.currentUser;

  const fileInput = document.getElementById("file") as HTMLInputElement;

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [isMessage, setIsMessage] = useState(false);
  const [isFile, setIsFile] = useState(true);

  const [error, setError] = useState("");

  const [postUploaded, setPostUploaded] = useState(false);

  const handleMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;

    setMessage(event.currentTarget.value);

    if (value.trim() !== "") {
      setIsMessage(true);
    } else {
      setIsMessage(false);
    }
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostUploaded(false);

    const { files } = event.currentTarget;

    if (files && files.length === 1) {
      const selectedFile = files[0];

      if (selectedFile.size <= 1024 * 1024) {
        setFile(selectedFile);
        setIsFile(true);

        setError("");
      } else {
        setFile(null);
        setIsFile(false);

        setError("size-exhausted");
      }
    }
  };

  const resetMessageSubmit = () => {
    setMessage("");
    setIsMessage(false);
  };

  const resetMessageButton = () => {
    resetMessageSubmit();
    setPostUploaded(false);
  };

  const resetPhotoSubmit = () => {
    setFile(null);
    setIsFile(true);
    fileInput.value = "";
  };

  const resetPhotoButton = () => {
    resetPhotoSubmit();
    setError("");
    setPostUploaded(false);
  };

  const postMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || !isMessage || message.length > 180 || !isFile || !user) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      const doc = await addDoc(collection(db, "messages"), {
        message,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });

      // 만약 파일이 존재한다면
      if (file) {
        // 파일 크기가 1MB 이하인지 확인
        if (file.size <= 1024 * 1024) {
          // Firebase Storage에 업로드할 위치 참조 생성
          const locationRef = ref(storage, `messages/${user.uid}/${doc.id}`);

          // 파일을 업로드하고 결과를 받아옴
          const result = await uploadBytes(locationRef, file);

          // 업로드된 파일의 다운로드 URL을 가져옴
          const url = await getDownloadURL(result.ref);

          // Firestore db의 문서를 업데이트하여 다운로드 URL을 추가
          await updateDoc(doc, {
            photo: url,
          });
        } else {
          // 파일 크기가 1MB를 초과하면 에러 발생
          setFile(null);
          setError("size-exhausted");
        }
      }

      setPostUploaded(true);

      setTimeout(() => {
        setPostUploaded(false);
      }, 5000);

      resetMessageSubmit();
      resetPhotoSubmit();
    } catch (error) {
      setPostUploaded(false);

      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log(error.code);
      } else {
        setError("size-exhausted");
        console.log(error);
      }

      resetMessageSubmit();
      resetPhotoSubmit();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-100">
      {postUploaded && !error && (
        <Alert variant="success" className="m-0 mt-3 w-100" dismissible>
          <p>Message successfully posted!</p>
        </Alert>
      )}
      {error && (
        <Alert variant="danger" className="m-0 mt-3 w-100" dismissible>
          <p>
            {error === "permission-denied" &&
              "Access Denied. You lack the necessary permissions to add/update a document."}
            {error === "not-found" &&
              "Document not found. The document you are trying to add/update does not exist."}
            {error === "resource-exhausted" &&
              "Resource Limit Exceeded. The operation could not be completed due to resource constraints."}
            {error === "invalid-argument" &&
              "Invalid Argument. Ensure that the data you are attempting to add/update is correctly formatted."}
            {error === "size-exhausted" &&
              "File size exceeds 1MB. Please choose a smaller file."}
            {error === "already exists" && "Data update failed."}
            {error === "storage/quota-exceeded" &&
              "Storage quota exceeded. Please free up space or try again later."}
            {error === "storage/unauthenticated" &&
              "User authentication required. Please sign in and try again."}
            {error === "storage/unauthorized" &&
              "Access denied. You lack the necessary permissions."}
            {error === "storage/object-not-found" &&
              "Unable to retrieve download URL. The requested file does not exist."}
            {(error === "unknown" || error === "unknown-error") &&
              "An unexpected error occurred. Please try again later."}
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
        <Form className="w-100" onSubmit={postMessage}>
          <Form.Group>
            <Form.Control
              as="textarea"
              onChange={handleMessage}
              value={message}
              rows={5}
              maxLength={180}
              className="mb-4"
              style={{ resize: "none" }}
              placeholder="Your message..."
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
              className="d-none mb-4"
              accept="image/*"
            />
          </Form.Group>
          <ButtonGroup className="w-100 mb-4">
            <Button
              onClick={resetPhotoButton}
              type="button"
              variant="outline-info"
            >
              Reset Photo
            </Button>
            <Button
              onClick={resetMessageButton}
              type="button"
              variant="outline-info"
            >
              Reset Message
            </Button>
          </ButtonGroup>
          <Button
            type="submit"
            variant="primary"
            className="w-100 fw-bold"
            {...(!isMessage || !isFile
              ? { disabled: true }
              : { disabled: false })}
          >
            {isLoading ? "Posting..." : "Post Message"}
          </Button>
        </Form>
      </Alert>
    </div>
  );
}
