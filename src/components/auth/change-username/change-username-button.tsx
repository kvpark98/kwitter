import { Button } from "react-bootstrap";

export interface ChangeUsernameButtonProps {
  isLoading: boolean;
  isName: boolean;
}

export default function ChangeUsernameButton({
  isLoading,
  isName,
}: ChangeUsernameButtonProps) {
  return (
    <Button
      type="submit"
      className="mt-2 fw-bold"
      {...(!isName ? { disabled: true } : { disabled: false })}
    >
      {isLoading ? "Changing..." : "Change"}
    </Button>
  );
}
