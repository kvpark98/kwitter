import { Button } from "react-bootstrap";

export interface ChangeUsernameResetProps {
  reset: () => void;
}

export default function ChangeUsernameReset({
  reset,
}: ChangeUsernameResetProps) {
  return (
    <Button
      type="button"
      onClick={reset}
      variant="outline-info"
      className="w-100 mt-3"
    >
      Reset
    </Button>
  );
}
