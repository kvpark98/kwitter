import { Alert, Button, ButtonGroup, Card, Form } from "react-bootstrap";
import ModifyProfileName from "./modify-profile-name";
import ModifyProfileButtons from "./modify-profile-buttons";
import ModifyProfileSuccess from "../../../alert/success/auth/modify-profile/modify-profile-success";
import ModifyProfileErrors from "../../../alert/error/auth/modify-profile/modify-profile-errors";

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
  handleDeleteAvatar: () => Promise<void>;
  handleDeleteBackground: () => Promise<void>;
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
  handleDeleteAvatar,
  handleDeleteBackground,
}: ModifyProfileFormProps) {
  return (
    <Form className="w-100" onSubmit={modifyProfile}>
      <Alert
        variant="light"
        className="m-0 p-4 overflow-y-auto"
        style={{ maxHeight: "600px" }}
      >
        {isProfileModified && !error && <ModifyProfileSuccess />}
        {error && <ModifyProfileErrors error={error} />}
        <Form.Group className="position-relative mb-4">
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
                src="/default-background.png"
                alt="Background Image"
                className="img-fluid"
                style={{ width: "600px", height: "200px" }}
              />
            )}
          </Form.Label>
          {backgroundImagePreviewUrl && (
            <Button
              type="button"
              variant="secondary"
              className="d-flex align-items-center position-absolute top-50 start-50 translate-middle rounded-circle p-2 opacity-75"
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
                  className="position-absolute top-50 start-50 translate-middle btn m-0 p-0 border-0 z-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-plus-circle-dotted"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                  </svg>
                </Form.Label>
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
                    className="w-100 h-100 bg-light"
                  />
                ) : (
                  <Card.Img
                    src="/person-circle.svg"
                    alt="Avatar Image"
                    title="Add/Change Avatar"
                    className="w-100 h-100 bg-light"
                  />
                )}
                {avatarImagePreviewUrl && (
                  <Button
                    type="button"
                    variant="secondary"
                    className="d-flex align-items-center position-absolute top-50 start-50 translate-middle rounded-circle p-2 opacity-75"
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
        <div className="d-flex justify-content-end">
          <ButtonGroup>
            <Button variant="secondary" onClick={handleDeleteAvatar}>
              Default Avatar
            </Button>
            <Button variant="secondary" onClick={handleDeleteBackground}>
              Default Background
            </Button>
          </ButtonGroup>
        </div>
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
