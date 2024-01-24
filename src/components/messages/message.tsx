import { Alert, Button, Card, Modal } from "react-bootstrap";
import { IMessage } from "./time-line";
import { auth, db, storage } from "../../firebase";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import ModifyMessage from "./modify-message";

type HandleEditFunction = () => void;

export interface ModifyMessageProps {
  id: string;
  timeAgo: string | undefined;
  createdAt: string;
  message: string;
  photo?: string;
  userId: string;
  username: string;
  onEdit: boolean;
  handleEdit: HandleEditFunction;
}

export default function Message({
  id,
  timeAgo,
  createdAt,
  message,
  photo,
  userId,
  username,
}: IMessage) {
  const user = auth.currentUser;

  const [isLoading, setIsLoading] = useState(false);

  const [onEdit, setOnEdit] = useState(false);

  const handleEdit = () => {
    setOnEdit((current) => !current);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const [error, setError] = useState("");

  // 메시지 삭제 함수
  const deleteMessage = async () => {
    if (isLoading || user?.uid !== userId) {
      return;
    }

    try {
      setIsLoading(true);

      // Firestore에서 메시지 문서 삭제
      await deleteDoc(doc(db, "messages", id));

      // 이미지가 있는 경우 Storage에서 이미지 삭제
      if (photo) {
        const photoRef = ref(storage, `messages/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log(error.code);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-100">
      <Card
        {...(user?.uid === userId && { border: "success" })}
        className="mb-4"
      >
        {onEdit ? (
          <ModifyMessage
            id={id}
            timeAgo={timeAgo}
            createdAt={createdAt}
            message={message}
            photo={photo}
            userId={userId}
            username={username}
            onEdit={onEdit}
            handleEdit={handleEdit}
          />
        ) : (
          <div>
            <div className="d-flex">
              <Card.Body>
                <Card.Title className="fw-bold mb-3">{username}</Card.Title>
                <Card.Text>{message}</Card.Text>
              </Card.Body>
              {photo && (
                <Card.Img variant="top" src={photo} className="w-25 h-25" />
              )}
            </div>
            <Card.Footer className="d-flex justify-content-between">
              <p className="d-flex align-items-center">
                <small className="text-muted">{timeAgo}</small>
              </p>
              {user?.uid === userId && (
                <div>
                  <Button
                    type="button"
                    variant="outline-success"
                    title="Edit"
                    style={{ padding: "1px 6px" }}
                    className="me-1"
                    onClick={handleEdit}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    variant="outline-danger"
                    title="Delete"
                    style={{ padding: "1px 6px" }}
                    onClick={handleShowDeleteModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      className="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </Button>
                </div>
              )}
            </Card.Footer>
          </div>
        )}
      </Card>
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        backdrop="static"
        keyboard={false}
      >
        <Alert variant="warning" className="m-0 p-0">
          <Modal.Body>
            <Alert.Heading className="mb-3">Are You Sure?</Alert.Heading>
            <p>
              Are you sure you want to delete this message? This action cannot
              be undone.
            </p>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 p-3">
            <Button variant="outline-dark" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
            <Button variant="outline-danger" onClick={deleteMessage}>
              Delete
            </Button>
          </Modal.Footer>
        </Alert>
      </Modal>
    </div>
  );
}
