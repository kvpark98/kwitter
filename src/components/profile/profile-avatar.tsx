import { Button, Card, Form } from "react-bootstrap";

export interface ProfileAvatarProps {
  avatar: string | null | undefined;
  handleDeleteAvatar: () => Promise<void>;
}

export default function ProfileAvatar({
  avatar,
  handleDeleteAvatar,
}: ProfileAvatarProps) {
  return (
    <div
      className="rounded-circle overflow-hidden"
      style={{ width: "180px", height: "180px" }}
    >
      <Form.Label htmlFor="avatar" className="btn m-0 p-0 border-0">
        <Card.Img src={avatar!} title="Change Avatar"></Card.Img>
      </Form.Label>
      <Button
        variant="danger"
        className="d-flex align-items-center position-absolute rounded-circle top-0 end-0 p-2"
        title="Delete Avatar"
        onClick={handleDeleteAvatar}
      >
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
      </Button>
    </div>
  );
}
