import { Button } from "react-bootstrap";

export interface ChangePasswordSubmitProps {
  isLoading: boolean;
  isCurrentPassword: boolean;
  isNewPassword: boolean;
  isNewPasswordConfirm: boolean;
}

export default function ChangePasswordSubmit({
  isLoading,
  isCurrentPassword,
  isNewPassword,
  isNewPasswordConfirm,
}: ChangePasswordSubmitProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      className="fw-bold rounded-pill"
      {...(!isCurrentPassword || !isNewPassword || !isNewPasswordConfirm
        ? { disabled: true }
        : { disabled: false })}
    >
      {isLoading ? "Changing..." : "Change"}
    </Button>
  );
}
