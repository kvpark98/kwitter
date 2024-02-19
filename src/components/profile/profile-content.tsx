import ProfileErrors from "../alert/error/profile/profile-errors";
import { Wrapper } from "../styles/auth-components";
import ScrollProfile from "../scrolls/scrollProfile";
import { User } from "firebase/auth";
import ProfileForm from "./profile-form";
import Tweet, { ITweet } from "../tweets/query/detail/tweet";

export interface ProfileContentProps {
  user: User | null;
  error: string;
  avatar: string | null | undefined;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleAvatar: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleDeleteAvatar: () => Promise<void>;
  tweets: ITweet[];
}

export default function ProfileContent({
  user,
  error,
  avatar,
  fileInputRef,
  handleAvatar,
  handleDeleteAvatar,
  tweets,
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
      {tweets.length !== 0 && (
        <div className="w-100 overflow-y-scroll" style={{ maxHeight: "600px" }}>
          {tweets.map((tweet) => {
            return <Tweet key={tweet.id} {...tweet} />;
          })}
        </div>
      )}
      <ScrollProfile />
    </Wrapper>
  );
}
