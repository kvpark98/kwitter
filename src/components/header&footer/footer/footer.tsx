import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <Container
      fluid
      className="d-flex justify-content-between position-absolute py-4 w-100 bottom-0 bg-dark"
    >
      <p className="text-white m-0">&copy; Learn-Korean-Well, Inc.</p>
    </Container>
  );
}
