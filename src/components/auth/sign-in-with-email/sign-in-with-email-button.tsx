import { Button } from "react-bootstrap";

export interface SignInWithEmailButtonProps {
  isLoading: boolean;
  isEmail: boolean;
}

export default function SignInWithEmailButton({
  isLoading,
  isEmail,
}: SignInWithEmailButtonProps) {
  return (
    <Button
      type="submit"
      className="mt-2 fw-bold rounded-pill"
      {...(!isEmail ? { disabled: true } : { disabled: false })}
    >
      {isLoading ? "Signing in..." : "One-time Sign-in"}
    </Button>
  );
}
