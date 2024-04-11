import ScrollProfile from "../scrolls/scrollProfile";
import { User } from "firebase/auth";
import { ITweet } from "../tweets/query/detail/tweet";
import UserTweets from "./user-tweets/user-tweets";
import ProfileHeader from "./profile-header";
import ModifyProfile from "./modify-profile/modify/modify-profile";
import ProfileImages from "./profile-images";
import ProfileEditButton from "./profile-edit-button";
import ProfileNav from "./profile-nav";

export interface ProfileContentProps {
  user: User | null;
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
  showModifyProfileModal: boolean;
  handleShowModifyProfileModal: () => void;
  handleCloseModifyProfileModal: () => void;
  handleDeleteAvatar: () => void;
  handleDeleteBackground: () => void;
  isPostActive: boolean;
  postActive: () => void;
  tweets: ITweet[];
  back: () => void;
}

export default function ProfileContent({
  user,
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
  showModifyProfileModal,
  handleShowModifyProfileModal,
  handleCloseModifyProfileModal,
  handleDeleteAvatar,
  handleDeleteBackground,
  isPostActive,
  postActive,
  tweets,
  back,
}: ProfileContentProps) {
  return (
    <div>
      <ProfileHeader user={user} tweets={tweets} back={back} />
      <ProfileImages avatar={avatar} background={background} />
      <ProfileEditButton
        handleShowModifyProfileModal={handleShowModifyProfileModal}
      />
      <ProfileNav postActive={postActive} />
      {isPostActive && tweets.length !== 0 && <UserTweets tweets={tweets} />}
      <ScrollProfile />
      <ModifyProfile
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
        noSpace={noSpace}
        resetName={resetName}
        resetAvatar={resetAvatar}
        resetBackground={resetBackground}
        modifyProfile={modifyProfile}
        showModifyProfileModal={showModifyProfileModal}
        handleCloseModifyProfileModal={handleCloseModifyProfileModal}
        handleDeleteAvatar={handleDeleteAvatar}
        handleDeleteBackground={handleDeleteBackground}
      />
    </div>
  );
}
