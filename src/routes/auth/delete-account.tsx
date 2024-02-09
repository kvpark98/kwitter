import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header&footer/header/header";
import Footer from "../../components/header&footer/footer/footer";
import DeleteAccountForm from "../../components/auth/delete-account/delete-account-form";

export default function DeleteAccount() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [dataRemovalChecked, setDataRemovalChecked] = useState(false);

  const [contentRetentionChecked, setContentRetentionChecked] = useState(false);

  const [rejoiningChecked, setRejoiningChecked] = useState(false);

  const [considerationChecked, setConsiderationChecked] = useState(false);

  const [allChecked, setAllChecked] = useState(false);

  const [password, setPassword] = useState("");

  const [isPassword, setIsPassword] = useState(false);

  const [error, setError] = useState("");

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setPassword(value.replace(/\s/gi, ""));

    if (value !== "") {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
  };

  const noSpace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Space") {
      event.preventDefault();
    }
  };

  const reset = () => {
    setPassword("");

    setIsPassword(false);
  };

  const signOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (
      !dataRemovalChecked ||
      !contentRetentionChecked ||
      !rejoiningChecked ||
      !considerationChecked
    ) {
      setAllChecked(false);
    }
  }, [
    dataRemovalChecked,
    contentRetentionChecked,
    rejoiningChecked,
    considerationChecked,
  ]);

  const agreeDataRemoval = () => {
    setDataRemovalChecked((current) => !current);
    reset();
  };

  const agreeContentRetention = () => {
    setContentRetentionChecked((current) => !current);
    reset();
  };

  const agreeRejoining = () => {
    setRejoiningChecked((current) => !current);
    reset();
  };

  const agreeConsideration = () => {
    setConsiderationChecked((current) => !current);
    reset();
  };

  const agreeAll = () => {
    if (!allChecked) {
      setAllChecked(true);

      if (
        !dataRemovalChecked ||
        !contentRetentionChecked ||
        !rejoiningChecked ||
        !considerationChecked
      ) {
        setDataRemovalChecked(true);
        setContentRetentionChecked(true);
        setRejoiningChecked(true);
        setConsiderationChecked(true);

        reset();
      }
    } else {
      setAllChecked(false);
    }
  };

  const deleteAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      isLoading ||
      !isPassword ||
      !dataRemovalChecked ||
      !contentRetentionChecked ||
      !rejoiningChecked ||
      !considerationChecked
    ) {
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      const credential = EmailAuthProvider.credential(
        auth.currentUser?.email!,
        password
      );

      await reauthenticateWithCredential(auth.currentUser!, credential);

      await deleteUser(auth.currentUser!);

      window.localStorage.setItem("accountDeleted", "true");

      signOut();
    } catch (error) {
      window.localStorage.removeItem("accountDeleted");

      if (error instanceof FirebaseError) {
        setError(error.code);
        console.log("FirebaseError", error.code);
      }

      reset();

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
        <DeleteAccountForm
          isLoading={isLoading}
          error={error}
          password={password}
          handlePassword={handlePassword}
          isPassword={isPassword}
          noSpace={noSpace}
          reset={reset}
          dataRemovalChecked={dataRemovalChecked}
          agreeDataRemoval={agreeDataRemoval}
          contentRetentionChecked={contentRetentionChecked}
          agreeContentRetention={agreeContentRetention}
          rejoiningChecked={rejoiningChecked}
          agreeRejoining={agreeRejoining}
          considerationChecked={considerationChecked}
          agreeConsideration={agreeConsideration}
          allChecked={allChecked}
          agreeAll={agreeAll}
          deleteAccount={deleteAccount}
          goBack={goBack}
        />
        <Footer />
      </div>
    </div>
  );
}
