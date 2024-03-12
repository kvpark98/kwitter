import { Alert, Button, Card, Form } from "react-bootstrap";
import ChangeUsernameErrors from "../../../alert/error/auth/modify-profile/modify-profile-errors";
import ModifyProfileName from "./modify-profile-name";
import ModifyProfileButtons from "./modify-profile-buttons";
import ModifyProfileSuccess from "../../../alert/success/auth/modify-profile/modify-profile-success";

export interface ModifyProfileFormProps {
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
  avatarImagePreviewUrl: string;
  handleAvatarImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  background: string;
  backgroundImagePreviewUrl: string;
  handleBackgroundImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  resetName: () => void;
  resetAvatar: () => void;
  resetBackground: () => void;
  modifyProfile: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isProfileModified: boolean;
  handleCloseModifyModal: () => void;
}

export default function ModifyProfileForm({
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
  avatarImagePreviewUrl,
  handleAvatarImage,
  background,
  backgroundImagePreviewUrl,
  handleBackgroundImage,
  noSpace,
  resetName,
  resetAvatar,
  resetBackground,
  modifyProfile,
  isProfileModified,
  handleCloseModifyModal,
}: ModifyProfileFormProps) {
  return (
    <Form className="w-100" onSubmit={modifyProfile}>
      <Alert
        variant="light"
        className="m-0 p-4 overflow-y-auto"
        style={{ maxHeight: "600px" }}
      >
        {isProfileModified && !error && <ModifyProfileSuccess />}
        {error && <ChangeUsernameErrors error={error} />}
        <Form.Group className="position-relative mb-5">
          <Form.Label
            htmlFor="background"
            className="position-relative btn m-0 p-0"
          >
            {backgroundImagePreviewUrl ? (
              <img
                src={backgroundImagePreviewUrl}
                alt="Background Image"
                className="img-fluid"
                style={{ width: "600px", height: "200px" }}
              />
            ) : background ? (
              <img
                src={background}
                alt="Background Image"
                className="img-fluid"
                style={{ width: "600px", height: "200px" }}
              />
            ) : (
              <img
                src="/JEJU1.jpeg"
                alt="Background Image"
                className="img-fluid"
                style={{ width: "600px", height: "200px" }}
              />
            )}
            {backgroundImagePreviewUrl && (
              <Button
                type="button"
                variant="secondary"
                className="d-flex align-items-center position-absolute top-50 start-50 translate-middle rounded-circle p-2"
                onClick={resetBackground}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </Button>
            )}
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
                className="position-relative rounded-circle overflow-hidden"
                style={{ width: "130px", height: "130px" }}
              >
                <Form.Label
                  htmlFor="avatar"
                  className="btn m-0 p-0 border-0 w-100 h-100"
                >
                  {avatarImagePreviewUrl ? (
                    <Card.Img
                      src={avatarImagePreviewUrl}
                      alt="Avatar Image"
                      title="Add/Change Avatar"
                      className="w-100 h-100"
                    />
                  ) : avatar ? (
                    <Card.Img
                      src={avatar}
                      alt="Avatar Image"
                      title="Add/Change Avatar"
                      className="w-100 h-100"
                    />
                  ) : (
                    <Card.Img
                      src="/JEJU1.jpeg"
                      alt="Avatar Image"
                      title="Add/Change Avatar"
                      className="w-100 h-100"
                    />
                  )}
                </Form.Label>
                {avatarImagePreviewUrl && (
                  <Button
                    type="button"
                    variant="secondary"
                    className="d-flex align-items-center position-absolute top-50 start-50 translate-middle rounded-circle p-2"
                    onClick={resetAvatar}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-x-lg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                  </Button>
                )}
              </div>
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
        <ModifyProfileName
          nameInputRef={nameInputRef}
          name={name}
          handleName={handleName}
          isName={isName}
          nameErrorMessage={nameErrorMessage}
          noSpace={noSpace}
        />
        <ModifyProfileButtons
          isLoading={isLoading}
          isName={isName}
          resetName={resetName}
          handleCloseModifyModal={handleCloseModifyModal}
        />
      </Alert>
    </Form>
  );
}
