import { useState } from "react";
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  Card,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { ModifyMessageProps } from "./message";
import { auth, db, storage } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export default function ModifyMessage({
  id,
  message,
  photo,
  showModifyModal,
  handleCloseModifyModal,
}: ModifyMessageProps) {
  const user = auth.currentUser;

  const newFileInput = document.getElementById("newFile") as HTMLInputElement;

  const [isLoading, setIsLoading] = useState(false);

  const [newMessage, setNewMessage] = useState(message);

  const [newFile, setNewFile] = useState<File | null>(null);

  const [isNewMessage, setIsNewMessage] = useState(true);

  const [postModified, setPostModified] = useState(false);

  const [deletePhotoClicked, setDeletePhotoClicked] = useState(false);

  const [error, setError] = useState("");

  const handleDeletePhotoClicked = () => {
    setDeletePhotoClicked((current) => !current);
  };

  const handleMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;

    setNewMessage(value);

    if (value.trim() !== "") {
      setIsNewMessage(true);
    } else {
      setIsNewMessage(false);
    }
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostModified(false);

    const { files } = event.currentTarget;

    if (files && files.length === 1) {
      const selectedFile = files[0];

      if (selectedFile.size <= 1024 * 1024) {
        setNewFile(selectedFile);
        setError("");
      } else {
        setNewFile(null);
        setError("size-exhausted");

        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };

  const resetMessageSubmit = () => {
    setNewMessage(message);
    setIsNewMessage(true);
  };

  const resetMessageButton = () => {
    resetMessageSubmit();
    setPostModified(false);
  };

  const resetPhotoSubmit = () => {
    setNewFile(null);
    if (newFile) {
      newFileInput.value = "";
    }
  };

  const resetPhotoButton = () => {
    resetPhotoSubmit();
    setError("");
    setPostModified(false);
  };

  const modifyMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || !isNewMessage || newMessage.length > 180 || !user) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      // Firestore의 메시지 문서 업데이트
      await updateDoc(doc(db, "messages", id), {
        message: newMessage,
        createdAt: Date.now(),
      });

      // 새로운 파일이 있는 경우
      if (newFile) {
        // 이전 이미지가 있는 경우
        if (photo) {
          // Storage에서 이전 이미지 삭제
          const photoRef = ref(storage, `messages/${user.uid}/${id}`);
          await deleteObject(photoRef);
        }
        // 새로운 파일의 크기가 1MB 이하인지 확인
        if (newFile.size <= 1024 * 1024) {
          // Firebase Storage에 업로드할 위치 참조 생성
          const locationRef = ref(storage, `messages/${user.uid}/${id}`);

          // 파일 업로드 및 결과 받아오기
          const result = await uploadBytes(locationRef, newFile);

          // 업로드된 파일의 다운로드 URL 가져오기
          const url = await getDownloadURL(result.ref);

          // Firestore db의 문서를 업데이트하여 다운로드 URL을 추가
          await updateDoc(doc(db, "messages", id), {
            photo: url,
          });
        } else {
          // 파일 크기가 1MB를 초과하면 에러 발생
          setNewFile(null);
          setError("size-exhausted");
        }
      }

      // 기존 이미지만 삭제
      if (deletePhotoClicked) {
        await updateDoc(doc(db, "messages", id), {
          photo: deleteField(),
        });

        const photoRef = ref(storage, `messages/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }

      // 포스트가 수정되었음을 표시
      setPostModified(true);

      // 포스트 수정 상태를 5초 후에 초기화
      setTimeout(() => {
        setPostModified(false);
      }, 5000);
    } catch (error) {
      // 에러 발생 시 포스트 수정 상태를 초기화
      setPostModified(false);

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
    <div>
      <Modal
        show={showModifyModal}
        onHide={handleCloseModifyModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Form className="w-100" onSubmit={modifyMessage}>
          <Alert variant="light" className="m-0">
            <Modal.Header className="d-flex justify-content-center align-items-center border-0 pb-2">
              <Alert.Heading className="m-0 fs-2">Modify Message</Alert.Heading>
            </Modal.Header>
            <Modal.Body>
              {postModified && !error && (
                <Alert variant="success" className="m-0 mb-3 w-100">
                  <p>Message successfully Modified!</p>
                </Alert>
              )}
              {error && (
                <Alert variant="danger" className="m-0 mb-3 w-100">
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
              <Form.Group>
                <InputGroup className="d-flex">
                  <Form.Control
                    id="textarea"
                    as="textarea"
                    onChange={handleMessage}
                    value={newMessage}
                    rows={5}
                    maxLength={180}
                    className="mb-3 w-75"
                    style={{ resize: "none" }}
                    placeholder="Your message..."
                  />
                  <InputGroup.Text className="w-25 mb-3 p-0">
                    <Form.Label
                      htmlFor="newFile"
                      className="btn btn-outline-secondary w-100 h-100 border-0 m-0 p-0"
                    >
                      {newFile ? (
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
                      ) : photo ? (
                        <div className="w-100 h-100">
                          <Card.Img
                            variant="top"
                            src={photo}
                            alt="Photo"
                            className="position-relative w-100 h-100 rounded-end"
                            title="Change Photo"
                          />
                          <Form.Label
                            htmlFor="deletePhoto"
                            className="m-0"
                            onClick={handleDeletePhotoClicked}
                          >
                            <Badge
                              bg={deletePhotoClicked ? "danger" : "light"}
                              title={
                                deletePhotoClicked
                                  ? "Delete Checked"
                                  : "Delete Unchecked"
                              }
                              className="d-flex align-items-center position-absolute top-0 end-0 p-1 border border-2 border-danger"

                              // onClick={deletePhoto}
                            >
                              {deletePhotoClicked ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-trash3-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-trash3 text-danger"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                </svg>
                              )}
                            </Badge>
                          </Form.Label>
                          <Form.Check
                            id="deletePhoto"
                            type="checkbox"
                            className="d-none"
                          ></Form.Check>
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
                      id="newFile"
                      className="d-none mb-4"
                      accept="image/*"
                    />
                  </InputGroup.Text>
                </InputGroup>
                <ButtonGroup className="w-100">
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
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0 p-3">
              <Button
                type="submit"
                variant="primary w-100 m-0 mb-3"
                {...(!isNewMessage ? { disabled: true } : { disabled: false })}
              >
                {isLoading ? "Modifying..." : "Modify"}
              </Button>
              <Button
                variant="outline-dark w-100 m-0"
                onClick={handleCloseModifyModal}
              >
                Close
              </Button>
            </Modal.Footer>
          </Alert>
        </Form>
      </Modal>
    </div>
  );
}
