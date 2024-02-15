import { Card, Form } from "react-bootstrap";
import ProfileErrors from "../alert/error/profile/profile-errors";
import ProfileSuccess from "../alert/success/profile/profile-success";
import { Wrapper } from "../styles/auth-components";
import ScrollProfile from "../scrolls/scrollProfile";
import { User } from "firebase/auth";

export interface ProfileContentProps {
  user: User | null;
  uploadSuccess: boolean;
  error: string;
  avatar: string | null | undefined;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleAvatar: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export default function ProfileContent({
  user,
  uploadSuccess,
  error,
  avatar,
  fileInputRef,
  handleAvatar,
}: ProfileContentProps) {
  return (
    <Wrapper>
      <h1 className="fs-2 text-center mb-4">Profile</h1>
      {uploadSuccess && <ProfileSuccess />}
      {error && <ProfileErrors error={error} />}
      <div className="mb-4">
        <Form.Label
          htmlFor="avatar"
          className="btn btn-dark m-0 p-0 border-0 rounded-circle"
        >
          <div className="d-flex justify-content-center align-items-center">
            {Boolean(avatar) ? (
              <Card.Img
                src={avatar!}
                width="200"
                height="200"
                className="rounded-circle overflow-hidden"
              ></Card.Img>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                fill="currentColor"
                className="bi bi-person-circle rounded-circle bg-info"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            )}
          </div>
        </Form.Label>
        <Form.Control
          ref={fileInputRef}
          onChange={handleAvatar}
          id="avatar"
          type="file"
          accept="image/*"
          className="d-none"
        ></Form.Control>
      </div>
      <span>{user?.displayName ?? "Anonymous"}</span>
      <ScrollProfile />
    </Wrapper>
  );
}
