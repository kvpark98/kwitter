import ProfileErrors from "../alert/error/profile/profile-errors";
import { Wrapper } from "../styles/auth-components";
import ScrollProfile from "../scrolls/scrollProfile";
import { User } from "firebase/auth";
import ProfileForm from "./profile-form";

export interface ProfileContentProps {
  user: User | null;
  error: string;
  avatar: string | null | undefined;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleAvatar: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleDeleteAvatar: () => Promise<void>;
}

export default function ProfileContent({
  user,
  error,
  avatar,
  fileInputRef,
  handleAvatar,
  handleDeleteAvatar,
}: ProfileContentProps) {
  return (
    <Wrapper>
      <h1 className="fs-2 mb-4">{user?.displayName ?? "Anonymous"}</h1>
      {error && <ProfileErrors error={error} />}
      <ProfileForm
        avatar={avatar}
        fileInputRef={fileInputRef}
        handleAvatar={handleAvatar}
        handleDeleteAvatar={handleDeleteAvatar}
      />
      <ScrollProfile />
    </Wrapper>
  );
}
