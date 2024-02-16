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
          className="bi bi-x-lg align-middle"
          viewBox="0 0 16 16"
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
      </Button>
    </div>
  );
}
