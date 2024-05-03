import { Alert, Button, ListGroup } from "react-bootstrap";

export interface AccountChangePasswordProps {
  handleShowChangePasswordModal: () => void;
}

export default function AccountChangePassword({
  handleShowChangePasswordModal,
}: AccountChangePasswordProps) {
  return (
    <ListGroup.Item className="p-0 rounded-0">
      <Button
        variant="light"
        className="w-100 p-0 rounded-0 border-0"
        onClick={handleShowChangePasswordModal}
      >
        <Alert variant="light" className="d-flex border-0 m-0 p-3 rounded-0">
          <div className="d-flex w-100">
            <div className="d-flex align-items-center me-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-key-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
              </svg>
            </div>
            <div>
              <div className="fs-3 text-start">Change Password</div>
              <div className="text-start">
                Enhance account security by changing your password.
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center flex-shrink-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </div>
        </Alert>
      </Button>
    </ListGroup.Item>
  );
}
