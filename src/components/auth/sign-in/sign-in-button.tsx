import { Button } from "react-bootstrap";

export interface SignInButtonProps {
  isLoading: boolean;
  isEmail: boolean;
  isPassword: boolean;
}

export default function SignInButton({
  isLoading,
  isEmail,
  isPassword,
}: SignInButtonProps) {
  return (
    <Button
      type="submit"
      className="fw-bold"
      {...(!isEmail || !isPassword ? { disabled: true } : { disabled: false })}
    >
      {isLoading ? "Signing In..." : "Sign In"}
    </Button>
  );
}
