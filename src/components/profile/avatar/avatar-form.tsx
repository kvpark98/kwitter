import Avatar from "./avatar";
import NoAvatar from "./no-avatar";

export interface AvatarFormProps {
  avatar: string | null | undefined;
}

export default function AvatarForm({ avatar }: AvatarFormProps) {
  return (
    <div
      className="d-flex justify-content-center align-items-center mb-4 position-absolute top-100 translate-middle-y"
      style={{ left: "5%" }}
    >
      {Boolean(avatar) ? <Avatar avatar={avatar} /> : <NoAvatar />}
    </div>
  );
}
