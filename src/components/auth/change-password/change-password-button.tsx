import { Button } from "react-bootstrap";

export interface ChangePasswordButtonProps {
  isLoading: boolean;
  isCurrentPassword: boolean;
  isNewPassword: boolean;
  isNewPasswordConfirm: boolean;
}

export default function ChangePasswordButton({
  isLoading,
  isCurrentPassword,
  isNewPassword,
  isNewPasswordConfirm,
}: ChangePasswordButtonProps) {
  return (
    <Button
      type="submit"
      className="mt-2 fw-bold"
      {...(!isCurrentPassword || !isNewPassword || !isNewPasswordConfirm
        ? { disabled: true }
        : { disabled: false })}
    >
      {isLoading ? "Changing..." : "Change"}
    </Button>
  );
}
