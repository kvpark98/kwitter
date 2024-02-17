import { Form } from "react-bootstrap";

export default function ProfileNoAvatar() {
  return (
    <Form.Label
      htmlFor="avatar"
      title="Add Avatar"
      className="d-flex justify-content-center align-items-center btn btn-light m-0 p-0 border-0 rounded-circle"
      style={{ width: "180px", height: "180px" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-person-circle"
        viewBox="0 0 16 16"
      >
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
        <path
          fillRule="evenodd"
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
        />
      </svg>
    </Form.Label>
  );
}
