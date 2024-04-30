import { Button } from "react-bootstrap";

export interface DeleteAccountPasswordButtonProps {
  isLoading: boolean;
  isDeletePassword: boolean;
}

export default function DeleteAccountPasswordButton({
  isLoading,
  isDeletePassword,
}: DeleteAccountPasswordButtonProps) {
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
