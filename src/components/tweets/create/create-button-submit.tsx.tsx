import { Button } from "react-bootstrap";

export interface CreateButtonSubmitProps {
  isLoading: boolean;
  isMessage: boolean;
}

export default function CreateButtonSubmit({
  isLoading,
  isMessage,
}: CreateButtonSubmitProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      className="fw-bold rounded-pill"
      {...(!isMessage ? { disabled: true } : { disabled: false })}
    >
      {isLoading ? "Posting..." : "Post"}
    </Button>
  );
}
