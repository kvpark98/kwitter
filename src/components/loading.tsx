import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function Loading() {
  return (
    <Wrapper>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Wrapper>
  );
}
