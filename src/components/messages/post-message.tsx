import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Alert, Button, ButtonGroup, InputGroup } from "react-bootstrap";
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

  const [postUploaded, setPostUploaded] = useState(false);

  const [error, setError] = useState("");

  const handleMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;

    setMessage(value);

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
        setError("");
      } else {
        setFile(null);
        setError("size-exhausted");

        setTimeout(() => {
          setError("");
        }, 5000);
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
    if (file) {
      fileInput.value = "";
    }
  };

  const resetPhotoButton = () => {
    resetPhotoSubmit();
    setError("");
    setPostUploaded(false);
  };

  const postMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || !isMessage || message.length > 180 || !user) {
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

      // 파일이 있는 경우
      if (file) {
        // 파일의 크기가 1MB 이하인지 확인
        if (file.size <= 1024 * 1024) {
          // Firebase Storage에 업로드할 위치 참조 생성
          const locationRef = ref(storage, `messages/${user.uid}/${doc.id}`);

          // 파일 업로드 및 결과 받아오기
          const result = await uploadBytes(locationRef, file);

          // 업로드된 파일의 다운로드 URL 가져오기
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

      // 포스트가 등록되었음을 표시
      setPostUploaded(true);

      // 포스트 등록 상태를 5초 후에 초기화
      setTimeout(() => {
        setPostUploaded(false);
      }, 5000);

      // 메시지 및 파일 상태를 초기화
      resetMessageSubmit();
      resetPhotoSubmit();
    } catch (error) {
      // 에러 발생 시 포스트 등록 상태를 초기화
      setPostUploaded(false);

      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log(error.code);
      } else {
        setError("size-exhausted");
        console.log(error);
      }

      // 메시지 및 파일 상태를 초기화
      resetMessageSubmit();
      resetPhotoSubmit();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-100">
      <h1 className="fs-2 text-center mb-4">Post Message</h1>
      {postUploaded && !error && (
        <Alert variant="success" className="m-0 mt-3 w-100">
          <p>Message successfully posted!</p>
        </Alert>
      )}
      {error && (
        <Alert variant="danger" className="m-0 w-100">
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
            <InputGroup className="d-flex">
              <Form.Control
                as="textarea"
                onChange={handleMessage}
                value={message}
                rows={5}
                maxLength={180}
                className="w-75 mb-4"
                style={{ resize: "none" }}
                placeholder="Your message..."
              />
              <InputGroup.Text className="w-25 mb-4 p-0">
                <Form.Label
                  htmlFor="file"
                  className="btn btn-outline-secondary w-100 h-100 border-0 m-0"
                >
                  {file ? (
                    <div
                      className="d-flex justify-content-center align-items-center h-100"
                      title="Change Photo"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-check-lg text-success"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                      </svg>
                    </div>
                  ) : (
                    <div
                      className="d-flex justify-content-center align-items-center h-100"
                      title="Add Photo"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-plus-circle-dotted"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                      </svg>
                    </div>
                  )}
                </Form.Label>
                <Form.Control
                  onChange={handleFile}
                  type="file"
                  id="file"
                  className="d-none mb-4"
                  accept="image/*"
                />
              </InputGroup.Text>
            </InputGroup>
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
            {...(!isMessage ? { disabled: true } : { disabled: false })}
          >
            {isLoading ? "Posting..." : "Post"}
          </Button>
        </Form>
      </Alert>
    </div>
  );
}
