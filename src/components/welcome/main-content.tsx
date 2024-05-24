import { StyledTitle } from "../../routes/welcome";
import AlreadyHaveAnAccount from "./already-have-an-account";
import NewToKwitter from "./new-to-kwitter";

export interface MainContentProps {
  handleShowSignUpModal: () => void;
  handleShowSignInModal: () => void;
}

export default function MainContent({
  handleShowSignUpModal,
  handleShowSignInModal,
}: MainContentProps) {
  return (
    <div className="d-flex flex-fill justify-content-center align-items-center">
      <div className="d-flex flex-column row-gap-3">
        <StyledTitle className="fw-bold mb-5">Welcome to Kwitter!</StyledTitle>
        <NewToKwitter handleShowSignUpModal={handleShowSignUpModal} />
        <hr />
        <AlreadyHaveAnAccount handleShowSignInModal={handleShowSignInModal} />
      </div>
    </div>
  );
}
