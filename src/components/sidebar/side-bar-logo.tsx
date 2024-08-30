import styled from "@emotion/styled";

// 미디어 쿼리를 사용하여 스타일 정의
const StyledLogo = styled.div`
  width: 52px !important;
  height: 52px !important;
  padding: 11px !important;
`;

export default function SideBarLogo() {
  return (
    <StyledLogo className="btn btn-light rounded-circle border-0 d-flex justify-content-center align-items-center">
      <a href="/" className="text-dark">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="d-flex justify-content-center align-items-center bi bi-twitter-x"
          viewBox="0 0 16 16"
        >
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
        </svg>
      </a>
    </StyledLogo>
  );
}
