import { Button } from "react-bootstrap";

export interface SignUpButtonProps {
  isLoading: boolean;
  isName: boolean;
  isEmail: boolean;
  isPassword: boolean;
  isPasswordConfirm: boolean;
}

export default function SignUpButton({
  isLoading,
  isName,
  isEmail,
  isPassword,
  isPasswordConfirm,
}: SignUpButtonProps) {
  return (
    <Button
      type="submit"
      className="mt-2 fw-bold"
      {...(!isName || !isEmail || !isPassword || !isPasswordConfirm
        ? { disabled: true }
        : { disabled: false })}
    >
      {isLoading ? "Signing Up..." : "Sign Up"}
    </Button>
  );
}
