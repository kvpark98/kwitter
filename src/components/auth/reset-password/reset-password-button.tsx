import { Button } from "react-bootstrap";

export interface ResetPasswordButtonProps {
  isLoading: boolean;
  isPassword: boolean;
  isPasswordConfirm: boolean;
}

export default function ResetPasswordButton({
  isLoading,
  isPassword,
  isPasswordConfirm,
}: ResetPasswordButtonProps) {
  return (
    <Button
      type="submit"
      className="mt-2 fw-bold rounded-pill"
      {...(!isPassword || !isPasswordConfirm
        ? { disabled: true }
        : { disabled: false })}
    >
      {isLoading ? "Resetting..." : "Reset"}
    </Button>
  );
}
