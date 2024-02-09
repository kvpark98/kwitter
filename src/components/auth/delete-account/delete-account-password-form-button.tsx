import { Button } from "react-bootstrap";

export interface DeleteAccountPasswordFormButtonProps {
  isLoading: boolean;
  isPassword: boolean;
}

export default function DeleteAccountPasswordFormButton({
  isLoading,
  isPassword,
}: DeleteAccountPasswordFormButtonProps) {
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
