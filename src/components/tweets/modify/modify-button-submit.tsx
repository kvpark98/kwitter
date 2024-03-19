import { Button } from "react-bootstrap";

export interface ModifyButtonSubmitProps {
  isLoading: boolean;
  isNewMessage: boolean;
}

export default function ModifyButtonSubmit({
  isLoading,
  isNewMessage,
}: ModifyButtonSubmitProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      className="fw-bold rounded-pill"
      {...(!isNewMessage ? { disabled: true } : { disabled: false })}
    >
      {isLoading ? "Saving..." : "Save"}
    </Button>
  );
}
