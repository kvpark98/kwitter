import { Navbar } from "react-bootstrap";

export default function HeaderTitle() {
  return (
    <Navbar.Brand href="/">
      <img
        src="/vite.svg"
        width="30"
        height="30"
        className="align-middle me-2"
        alt="Learn-Korean-Well"
      />
      <span className="align-middle">Learn-Korean-Well</span>
    </Navbar.Brand>
  );
}
