import { Button } from "react-bootstrap";

export interface SignInWithEmailSubmitProps {
  isLoading: boolean;
  isEmail: boolean;
}

export default function SignInWithEmailSubmit({
  isLoading,
  isEmail,
}: SignInWithEmailSubmitProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      className="fw-bold rounded-pill"
      {...(!isEmail ? { disabled: true } : { disabled: false })}
    >
      {isLoading ? "Signing in..." : "One-time sign-in"}
    </Button>
  );
}
