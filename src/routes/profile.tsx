import Footer from "../components/header&footer/footer/footer";
import Header from "../components/header&footer/header/header";
import { auth, storage } from "../firebase";
import { useRef, useState } from "react";
import {
  StorageError,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { FirestoreError } from "firebase/firestore";
import ProfileContent from "../components/profile/profile-content";

export default function Profile() {
  const user = auth.currentUser;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState(user?.photoURL);

  const [error, setError] = useState("");

  const handleAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (!user) {
      return;
    }

    setError("");

    try {
      if (files && files.length === 1) {
        const file = files[0];

        if (file.size <= 1024 * 1024) {
          const locationRef = ref(storage, `avatars/${user?.uid}`);
          const result = await uploadBytes(locationRef, file);
          const avatarUrl = await getDownloadURL(result.ref);

          setAvatar(avatarUrl);

          await updateProfile(user!, {
            photoURL: avatarUrl,
          });

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } else {
          throw new Error("size-exhausted");
        }
      }
    } catch (error) {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("FirebaseError", error.code);
      } else if (error instanceof FirestoreError) {
        setError(error.code);
        console.log("FirestoreError", error.code);
      } else if (error instanceof StorageError) {
        setError(error.code);
        console.log("StorageError", error.code);
      } else {
        setError("size-exhausted");
        console.log(error);
      }

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleDeleteAvatar = async () => {
    if (!avatar) {
      return;
    }

    try {
      setAvatar(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await updateProfile(user!, {
        photoURL: "",
      });

      const photoRef = ref(storage, `avatars/${user?.uid}`);

      await deleteObject(photoRef);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("FirebaseError", error.code);
      } else if (error instanceof FirestoreError) {
        setError(error.code);
        console.log("FirestoreError", error.code);
      } else if (error instanceof StorageError) {
        setError(error.code);
        console.log("StorageError", error.code);
      } else {
        setError("size-exhausted");
        console.log(error);
      }

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="h-100">
      <Header />
      <div className="wrap">
        <ProfileContent
          user={user}
          error={error}
          avatar={avatar}
          fileInputRef={fileInputRef}
          handleAvatar={handleAvatar}
          handleDeleteAvatar={handleDeleteAvatar}
        />
        <Footer />
      </div>
    </div>
  );
}
