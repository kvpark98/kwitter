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
  const [avatar, setAvatar] = useState(user?.photoURL || "/person-circle.svg");

  const getAvatar = async () => {
    try {
      const locationRef = ref(storage, `avatars/${userId}`);
      const result = await getDownloadURL(locationRef);
      setAvatar(result);
    } catch (error) {
      setAvatar("/person-circle.svg");
    }
  };

  getAvatar();

  return (
    <div className="me-2">
      {user?.uid === userId ? (
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
      ) : (
        <img
          src={user?.uid === userId ? user?.photoURL! ?? avatar : avatar}
          width="40"
          height="40"
          className="rounded-circle bg-light"
        />
      )}
    </div>
  );
}
