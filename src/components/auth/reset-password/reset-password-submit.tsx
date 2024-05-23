import { Button } from "react-bootstrap";

export interface ResetPasswordSubmitProps {
  isLoading: boolean;
  isPassword: boolean;
  isPasswordConfirm: boolean;
}

export default function ResetPasswordSubmit({
  isLoading,
  isPassword,
  isPasswordConfirm,
}: ResetPasswordSubmitProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      className="fw-bold rounded-pill"
      {...(!isPassword || !isPasswordConfirm
        ? { disabled: true }
        : { disabled: false })}
    >
      {isLoading ? "Resetting..." : "Reset"}
    </Button>
  );
}
