import { Form } from "react-bootstrap";

export interface DeleteAccountPasswordFormPasswordProps {
  password: string;
  handlePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function DeleteAccountPasswordFormPassword({
  password,
  handlePassword,
  noSpace,
}: DeleteAccountPasswordFormPasswordProps) {
  return (
    <Form.Group>
      <Form.Label htmlFor="password">
        Kindly input your password for a secure account withdrawal.
      </Form.Label>
      <Form.Control
        className="border-none mt-1 mb-1"
        onChange={handlePassword}
        onKeyDown={noSpace}
        id="password"
        name="password"
        value={password}
        type="password"
        autoComplete="new-password"
        maxLength={20}
      />
    </Form.Group>
  );
}
