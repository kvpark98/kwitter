import { useEffect, useRef, useState } from "react";
import { FirebaseError } from "firebase/app";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import Header from "../../components/header&footer/header/header";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/header&footer/footer/footer";
import ChangeUsernameForm from "../../components/auth/change-username/change-username-form";

export default function ChangeUsername() {
  const nameInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");

  const [isName, setIsName] = useState(false);

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

  const goBack = () => {
    navigate(-1);
  };

  const reset = () => {
    setName("");

    setIsName(false);

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
    <div className="h-100">
      <Header />
      <div className="wrap">
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
          goBack={goBack}
          changeName={changeName}
          isUpdated={isUpdated}
        />
        <Footer />
      </div>
    </div>
  );
}
