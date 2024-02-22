import { Button } from "react-bootstrap";

export interface CreateTweetButtonProps {
  isLoading: boolean;
  isMessage: boolean;
}

export default function CreateTweetButton({
  isLoading,
  isMessage,
}: CreateTweetButtonProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      className="w-100 fw-bold"
      {...(!isMessage ? { disabled: true } : { disabled: false })}
    >
      {isLoading ? "Creating..." : "Create"}
    </Button>
  );
}
