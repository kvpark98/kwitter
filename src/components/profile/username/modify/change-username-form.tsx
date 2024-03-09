import { Alert, Card, Form } from "react-bootstrap";
import ChangeUsernameName from "./change-username-name";
import ChangeUsernameErrors from "../../../alert/error/auth/change-username/change-username-errors";
import ChangeUsernameSuccess from "../../../alert/success/auth/change-username/change-username-success";
import ChangeUsernameButtons from "./change-username-buttons";

export interface ChangeUsernameFormProps {
  nameInputRef: React.RefObject<HTMLInputElement>;
  avatarInputRef: React.RefObject<HTMLInputElement>;
  backgroundInputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  error: string;
  name: string | null | undefined;
  handleName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isName: boolean;
  nameErrorMessage: string;
  avatar: string | null | undefined;
  avatarFile: File | null;
  avatarImagePreviewUrl: string;
  handleAvatarImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  backgroundFile: File | null;
  backgroundImagePreviewUrl: string;
  handleBackgroundImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: () => void;
  changeName: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isProfileModified: boolean;
  handleCloseModifyModal: () => void;
}

export default function ChangeUsernameForm({
  nameInputRef,
  avatarInputRef,
  backgroundInputRef,
  isLoading,
  error,
  name,
  handleName,
  isName,
  nameErrorMessage,
  avatar,
  avatarFile,
  avatarImagePreviewUrl,
  handleAvatarImage,
  backgroundFile,
  backgroundImagePreviewUrl,
  handleBackgroundImage,
  noSpace,
  reset,
  changeName,
  isProfileModified,
  handleCloseModifyModal,
}: ChangeUsernameFormProps) {
  return (
    <Form className="w-100" onSubmit={changeName}>
      <Alert
        variant="light"
        className="m-0 p-4 overflow-y-auto"
        style={{ maxHeight: "600px" }}
      >
        {isProfileModified && !error && <ChangeUsernameSuccess />}
        {error && <ChangeUsernameErrors error={error} />}
        <Form.Group className="position-relative mb-5">
          <Form.Label htmlFor="background" className="btn m-0 p-0">
            <img
              src="/JEJU1.jpeg"
              alt="Background Image"
              className="img-fluid"
              style={{ width: "600px", height: "200px" }}
            />
          </Form.Label>
          <Form.Control
            ref={backgroundInputRef}
            onChange={handleBackgroundImage}
            id="background"
            type="file"
            accept="image/*"
            className="d-none"
          ></Form.Control>
          <div
            className="d-flex justify-content-center align-items-center mb-4 position-absolute top-100 translate-middle-y"
            style={{ left: "5%" }}
          >
            <div>
              <div
                className="rounded-circle overflow-hidden"
                style={{ width: "130px", height: "130px" }}
              >
                <Form.Label
                  htmlFor="avatar"
                  className="btn m-0 p-0 border-0 w-100 h-100 ratio ratio-1x1"
                >
                  <Card.Img src="/JEJU1.jpeg" title="Add/Change Avatar" />
                </Form.Label>
              </div>
              {/* <Button
          type="button"
          variant="secondary"
          className="w-100 mt-3"
          onClick={handleDeleteAvatar}
        >
          Default Avatar
        </Button> */}
            </div>
            <Form.Control
              ref={avatarInputRef}
              onChange={handleAvatarImage}
              id="avatar"
              type="file"
              accept="image/*"
              className="d-none"
            ></Form.Control>
          </div>
        </Form.Group>
        <ChangeUsernameName
          nameInputRef={nameInputRef}
          name={name}
          handleName={handleName}
          isName={isName}
          nameErrorMessage={nameErrorMessage}
          noSpace={noSpace}
        />
        <ChangeUsernameButtons
          isLoading={isLoading}
          isName={isName}
          reset={reset}
          handleCloseModifyModal={handleCloseModifyModal}
        />
      </Alert>
    </Form>
  );
}
