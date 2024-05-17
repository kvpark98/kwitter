import { Button } from "react-bootstrap";

export interface DeleteAccountPasswordSubmitProps {
  isLoading: boolean;
  isDeletePassword: boolean;
}

export default function DeleteAccountPasswordSubmit({
  isLoading,
  isDeletePassword,
}: DeleteAccountPasswordSubmitProps) {
  return (
    <Button
      type="submit"
      variant="danger"
      className="fw-bold rounded-pill"
      {...(!isDeletePassword ? { disabled: true } : { disabled: false })}
    >
      {isLoading ? "Deleting..." : "Delete Account"}
    </Button>
  );
}
