import { Link } from "react-router-dom";
import { storage } from "../../../../firebase";
import { User } from "firebase/auth";
import { useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";

export interface TweetBodyProfileProps {
  user: User | null;
  userId: string;
  username: string;
}

export default function TweetBodyProfile({
  user,
  userId,
  username,
}: TweetBodyProfileProps) {
  const [avatar, setAvatar] = useState("/default-profile.png");

  const getAvatar = async () => {
    try {
      const locationRef = ref(storage, `avatars/${userId}`);
      console.log(locationRef.fullPath);
      const result = await getDownloadURL(locationRef);
      setAvatar(result);
    } catch (error) {
      setAvatar("/default-profile.png");
    }
  };

  getAvatar();

  return (
    <div className="me-2">
      <Link
        to="/profile"
        title={user?.uid === userId ? user?.displayName! : username}
      >
        <img
          src={user?.uid === userId ? user?.photoURL! ?? avatar : avatar}
          width="40"
          height="40"
          className="rounded-circle bg-light"
        />
      </Link>
    </div>
  );
}
