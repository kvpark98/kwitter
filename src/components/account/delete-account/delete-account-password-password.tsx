import { Form } from "react-bootstrap";

export interface DeleteAccountPasswordPasswordProps {
  deletePassword: string;
  handleDeletePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function DeleteAccountPasswordPassword({
  deletePassword,
  handleDeletePassword,
  noSpace,
}: DeleteAccountPasswordPasswordProps) {
  return (
    <Form.Group>
      <Form.Label htmlFor="password">
        Kindly input your password for a secure account withdrawal.
      </Form.Label>
      <Form.Control
        className="border-none mt-1 mb-1 rounded-pill"
        onChange={handleDeletePassword}
        onKeyDown={noSpace}
        id="password"
        name="password"
        value={deletePassword}
        type="password"
        autoComplete="new-password"
        maxLength={20}
      />
    </Form.Group>
  );
}
