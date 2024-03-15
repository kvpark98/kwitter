import ScrollProfile from "../scrolls/scrollProfile";
import { User } from "firebase/auth";
import { ITweet } from "../tweets/query/detail/tweet";
import UserTweets from "./user-tweets/user-tweets";
import ProfileHeader from "./profile-header";
import ModifyProfile from "./username/modify/modify-profile";
import ProfileImages from "./profile-images";
import ProfileEditButton from "./profile-edit-button";

export interface ProfileContentProps {
  user: User | null;
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
  showModifyModal: boolean;
  handleShowModifyModal: () => void;
  handleCloseModifyModal: () => void;
  handleDeleteAvatar: () => Promise<void>;
  handleDeleteBackground: () => Promise<void>;
  tweets: ITweet[];
  back: () => void;
}

export default function ProfileContent({
  user,
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
  showModifyModal,
  handleShowModifyModal,
  handleCloseModifyModal,
  handleDeleteAvatar,
  handleDeleteBackground,
  tweets,
  back,
}: ProfileContentProps) {
  return (
    <div>
      <ProfileHeader user={user} tweets={tweets} back={back} />
      <ProfileImages avatar={avatar} background={background} />
      <ProfileEditButton handleShowModifyModal={handleShowModifyModal} />
      {tweets.length !== 0 && <UserTweets tweets={tweets} />}
      <ScrollProfile />
      <ModifyProfile
        nameInputRef={nameInputRef}
        avatarInputRef={avatarInputRef}
        backgroundInputRef={backgroundInputRef}
        isLoading={isLoading}
        error={error}
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
        noSpace={noSpace}
        resetName={resetName}
        resetAvatar={resetAvatar}
        resetBackground={resetBackground}
        modifyProfile={modifyProfile}
        isProfileModified={isProfileModified}
        showModifyModal={showModifyModal}
        handleCloseModifyModal={handleCloseModifyModal}
        handleDeleteAvatar={handleDeleteAvatar}
        handleDeleteBackground={handleDeleteBackground}
      />
    </div>
  );
}
