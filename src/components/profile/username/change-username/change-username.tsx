import { useEffect, useRef, useState } from "react";
import { FirebaseError } from "firebase/app";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../../firebase";
import ChangeUsernameForm from "./change-username-form";
import { Modal } from "react-bootstrap";

export interface ChangeUsernameProps {
  showModifyModal: boolean;
  setShowModifyModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChangeUsername({
  showModifyModal,
  setShowModifyModal,
}: ChangeUsernameProps) {
  const user = auth.currentUser;

  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleCloseModifyModal = () => {
    setShowModifyModal(false);
    reset();
  };

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(user?.displayName);

  const [isName, setIsName] = useState(true);

  const [isUpdated, setIsUpdated] = useState(false);

  const [error, setError] = useState("");

  const [nameErrorMessage, setNameErrorMessage] = useState("");

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const regName = /^[가-힣a-zA-Z]{2,20}$/;

    setName(value.replace(/\s/gi, ""));

    if (value !== "") {
      if (!regName.test(value)) {
        setNameErrorMessage(
          "Please enter at least 2 characters either in English or Korean."
        );
        setIsName(false);

        nameInputRef.current?.classList.add("form-control-invalid");
      } else {
        setIsName(true);

        nameInputRef.current?.classList.remove("form-control-invalid");
      }
    } else {
      setNameErrorMessage("");
      setIsName(false);

      nameInputRef.current?.classList.remove("form-control-invalid");
    }
  };

  const noSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  const reset = () => {
    setName(user?.displayName);

    setIsName(true);

    setNameErrorMessage("");

    nameInputRef.current?.classList.remove("form-control-invalid");
  };

  useEffect(() => {
    window.localStorage.removeItem("error");
  }, []);

  const changeName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || !isName) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      await updateProfile(auth.currentUser!, {
        displayName: name,
      });

      setIsUpdated(true);

      reset();

      setTimeout(() => {
        setIsUpdated(false);
      }, 5000);
    } catch (error) {
      setIsUpdated(false);

      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("FirebaseError", error.code);
      }

      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={showModifyModal}
      onHide={handleCloseModifyModal}
      backdrop="static"
      keyboard={false}
      centered
    >
      <ChangeUsernameForm
        nameInputRef={nameInputRef}
        isLoading={isLoading}
        error={error}
        name={name}
        handleName={handleName}
        isName={isName}
        nameErrorMessage={nameErrorMessage}
        noSpace={noSpace}
        reset={reset}
        changeName={changeName}
        isUpdated={isUpdated}
        handleCloseModifyModal={handleCloseModifyModal}
      />
    </Modal>
  );
}
