import { Button } from "react-bootstrap";

export interface ChangeUsernameSubmitProps {
  isLoading: boolean;
  isName: boolean;
}

export default function ChangeUsernameSubmit({
  isLoading,
  isName,
}: ChangeUsernameSubmitProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      className="fw-bold rounded-pill"
      {...(!isName ? { disabled: true } : { disabled: false })}
    >
      {isLoading ? "Changing..." : "Change"}
    </Button>
  );
}
