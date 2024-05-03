import { Nav } from "react-bootstrap";

export interface ProfileNavProps {
  postActive: () => void;
}

export default function ProfileNav({ postActive }: ProfileNavProps) {
  return (
    <Nav variant="tabs" className="mt-5" defaultActiveKey="posts">
      <Nav.Item className="ms-2">
        <Nav.Link onClick={postActive} eventKey="posts">
          Posts
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
