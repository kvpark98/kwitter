import { Alert, Form } from "react-bootstrap";
import ModifyProfileName from "./modify-profile-name";
import ModifyProfileButtons from "./modify-profile-buttons";
import ModifyProfileSuccess from "../../../alert/success/auth/modify-profile/modify-profile-success";
import ModifyProfileErrors from "../../../alert/error/auth/modify-profile/modify-profile-errors";
import ModifyProfileImages from "./modify-profile-images";
import React from "react";

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
  handleDeleteAvatar,
  handleDeleteBackground,
}: ModifyProfileFormProps) {
  return (
    <Form className="w-100" onSubmit={modifyProfile}>
      <Alert
        variant="light"
        className="m-0 p-4 overflow-y-auto border-0"
        style={{ maxHeight: "600px" }}
      >
        {isProfileModified && !error && <ModifyProfileSuccess />}
        {error && <ModifyProfileErrors error={error} />}
        <ModifyProfileImages
          avatarInputRef={avatarInputRef}
          backgroundInputRef={backgroundInputRef}
          avatar={avatar}
          avatarImagePreviewUrl={avatarImagePreviewUrl}
          handleAvatarImage={handleAvatarImage}
          background={background}
          backgroundImagePreviewUrl={backgroundImagePreviewUrl}
          handleBackgroundImage={handleBackgroundImage}
          resetAvatar={resetAvatar}
          resetBackground={resetBackground}
          handleDeleteAvatar={handleDeleteAvatar}
          handleDeleteBackground={handleDeleteBackground}
        />
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
        />
      </Alert>
    </Form>
  );
}
