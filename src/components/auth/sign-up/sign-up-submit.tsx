import { Button } from "react-bootstrap";

export interface SignUpSubmitProps {
  isLoading: boolean;
  isName: boolean;
  isEmail: boolean;
  isPassword: boolean;
  isPasswordConfirm: boolean;
}

export default function SignUpSubmit({
  isLoading,
  isName,
  isEmail,
  isPassword,
  isPasswordConfirm,
}: SignUpSubmitProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      className="fw-bold rounded-pill"
      {...(!isName || !isEmail || !isPassword || !isPasswordConfirm
        ? { disabled: true }
        : { disabled: false })}
    >
      {isLoading ? "Signing up..." : "Sign up"}
    </Button>
  );
}
