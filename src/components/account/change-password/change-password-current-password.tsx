import { Form } from "react-bootstrap";

export interface ChangePasswordCurrentPasswordProps {
  currentPassword: string;
  handleCurrentPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  noSpace: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function ChangePasswordCurrentPassword({
  currentPassword,
  handleCurrentPassword,
  noSpace,
}: ChangePasswordCurrentPasswordProps) {
  return (
    <Form.Group>
      <Form.Label htmlFor="currentPassword">Current password</Form.Label>
      <Form.Control
        className="border-none mt-1 mb-1 rounded-pill"
        onChange={handleCurrentPassword}
        onKeyDown={noSpace}
        id="currentPassword"
        name="currentPassword"
        value={currentPassword}
        type="password"
        maxLength={20}
        autoComplete="password"
      />
    </Form.Group>
  );
}
