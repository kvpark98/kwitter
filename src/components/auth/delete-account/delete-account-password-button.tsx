import { Button } from "react-bootstrap";

export interface DeleteAccountPasswordButtonProps {
  isLoading: boolean;
  isPassword: boolean;
}

export default function DeleteAccountPasswordButton({
  isLoading,
  isPassword,
}: DeleteAccountPasswordButtonProps) {
  return (
    <Button
      type="submit"
      variant="danger"
      className="mt-2 fw-bold"
      {...(!isPassword ? { disabled: true } : { disabled: false })}
    >
      {isLoading ? "Deleting..." : "Delete Account"}
    </Button>
  );
}
