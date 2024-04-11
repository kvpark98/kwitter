import { Alert, Form } from "react-bootstrap";
import ModifyProfileName from "./modify-profile-name";
import ModifyProfileButtons from "./modify-profile-buttons";
import ModifyProfileImages from "./modify-profile-images";
import React from "react";

export interface ModifyProfileFormProps {
  nameInputRef: React.RefObject<HTMLInputElement>;
  avatarInputRef: React.RefObject<HTMLInputElement>;
  backgroundInputRef: React.RefObject<HTMLInputElement>;
  avatarImageRef: React.RefObject<HTMLImageElement>;
  backgroundImageRef: React.RefObject<HTMLImageElement>;
  isLoading: boolean;
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
  handleDeleteAvatar: () => void;
  handleDeleteBackground: () => void;
}

export default function ModifyProfileForm({
  nameInputRef,
  avatarInputRef,
  backgroundInputRef,
  avatarImageRef,
  backgroundImageRef,
  isLoading,
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
        <ModifyProfileImages
          avatarInputRef={avatarInputRef}
          backgroundInputRef={backgroundInputRef}
          avatarImageRef={avatarImageRef}
          backgroundImageRef={backgroundImageRef}
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
      </Alert>
      <ModifyProfileButtons
        isLoading={isLoading}
        isName={isName}
        resetName={resetName}
      />
    </Form>
  );
}
