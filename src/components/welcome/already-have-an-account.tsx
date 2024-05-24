import { StyledButton, StyledP } from "../../routes/welcome";

export interface AlreadyHaveAnAccountProps {
  handleShowSignInModal: () => void;
}

export default function AlreadyHaveAnAccount({
  handleShowSignInModal,
}: AlreadyHaveAnAccountProps) {
  return (
    <div>
      <StyledP>Already have an account?</StyledP>
      <StyledButton
        onClick={handleShowSignInModal}
        className="btn btn-outline-primary rounded-pill"
      >
        Sign in
      </StyledButton>
    </div>
  );
}
