import { Alert, Button, ListGroup } from "react-bootstrap";

export interface AccountDeleteAccountProps {
  handleShowChangePasswordModal: () => void;
}

export default function AccountDeleteAccount({
  handleShowChangePasswordModal,
}: AccountDeleteAccountProps) {
  return (
    <ListGroup.Item className="p-0">
      <Button
        variant="danger"
        className="w-100 p-0"
        onClick={handleShowChangePasswordModal}
      >
        <Alert variant="danger" className="d-flex border-0 m-0 p-3">
          <div className="d-flex w-100">
            <div className="d-flex align-items-center me-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-person-x-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708"
                />
              </svg>
            </div>
            <div>
              <div className="fs-3 text-start">Delete Account</div>
              <div className="text-start">
                After account deletion, there is no turning back. Please proceed
                with certainty.
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
