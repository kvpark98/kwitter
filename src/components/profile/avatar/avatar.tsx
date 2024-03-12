import { Card } from "react-bootstrap";

export interface AvatarProps {
  avatar: string | null | undefined;
}

export default function Avatar({ avatar }: AvatarProps) {
  return (
    <div
      className="rounded-circle overflow-hidden"
      style={{ width: "130px", height: "130px" }}
    >
      <Card.Img src={avatar!} alt="Avatar Image" className="w-100 h-100" />
    </div>
  );
}
