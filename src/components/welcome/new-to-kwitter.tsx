import { StyledButton, StyledP } from "../../routes/welcome";

export interface NewToKwitterProps {
  handleShowSignUpModal: () => void;
}

export default function NewToKwitter({
  handleShowSignUpModal,
}: NewToKwitterProps) {
  return (
    <div>
      <StyledP>New to Kwitter?</StyledP>
      <StyledButton
        onClick={handleShowSignUpModal}
        className="btn btn-primary rounded-pill"
      >
        Create an account
      </StyledButton>
    </div>
  );
}
