import { Modal } from "react-bootstrap";
import ModifyProfileForm from "./modify-profile-form";
import ModifyProfileHeader from "./modify-profile-header";
import React from "react";

export interface ModifyProfileProps {
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
  avatarDeleteButtonClicked: boolean;
  backgroundDeleteButtonClicked: boolean;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  resetName: () => void;
  resetAvatar: () => void;
  resetBackground: () => void;
  modifyProfile: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  showModifyProfileModal: boolean;
  handleCloseModifyProfileModal: () => void;
  handleDeleteAvatar: () => void;
  handleDeleteBackground: () => void;
}

export default function ModifyProfile({
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
  avatarDeleteButtonClicked,
  backgroundDeleteButtonClicked,
  noSpace,
  resetName,
  resetAvatar,
  resetBackground,
  modifyProfile,
  showModifyProfileModal,
  handleCloseModifyProfileModal,
  handleDeleteAvatar,
  handleDeleteBackground,
}: ModifyProfileProps) {
  return (
    <Modal
      show={showModifyProfileModal}
      onHide={handleCloseModifyProfileModal}
      backdrop="static"
      keyboard={false}
      className="border-0"
      centered
    >
      <ModifyProfileHeader
        handleCloseModifyProfileModal={handleCloseModifyProfileModal}
      />
      <ModifyProfileForm
        nameInputRef={nameInputRef}
        avatarInputRef={avatarInputRef}
        backgroundInputRef={backgroundInputRef}
        avatarImageRef={avatarImageRef}
        backgroundImageRef={backgroundImageRef}
        isLoading={isLoading}
        name={name}
        handleName={handleName}
        isName={isName}
        nameErrorMessage={nameErrorMessage}
        avatar={avatar}
        avatarImagePreviewUrl={avatarImagePreviewUrl}
        handleAvatarImage={handleAvatarImage}
        background={background}
        backgroundImagePreviewUrl={backgroundImagePreviewUrl}
        handleBackgroundImage={handleBackgroundImage}
        avatarDeleteButtonClicked={avatarDeleteButtonClicked}
        backgroundDeleteButtonClicked={backgroundDeleteButtonClicked}
        noSpace={noSpace}
        resetName={resetName}
        resetAvatar={resetAvatar}
        resetBackground={resetBackground}
        modifyProfile={modifyProfile}
        handleDeleteAvatar={handleDeleteAvatar}
        handleDeleteBackground={handleDeleteBackground}
      />
    </Modal>
  );
}
