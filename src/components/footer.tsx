import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="py-4 bg-dark position-absolute w-100 bottom-0">
      <Container fluid className="d-flex justify-content-between">
        <p className="text-white m-0">&copy; Learn-Korean-Well, Inc.</p>
      </Container>
    </footer>
  );
}
