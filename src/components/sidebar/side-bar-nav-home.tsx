import { Link } from "react-router-dom";
import styled from "@emotion/styled";

// 미디어 쿼리를 사용하여 스타일 정의
const StyledHome = styled.div`
  @media screen and (min-width: 700px) {
    width: 52px !important;
    height: 52px !important;
    padding: 16px !important;
  }
  @media screen and (max-width: 700px) {
    width: 48px !important;
    height: 48px !important;
    padding: 14px !important;
  }
  @media screen and (max-width: 600px) {
    width: 46px !important;
    height: 46px !important;
    padding: 13px !important;
  }
`;

export default function SideBarNavHome() {
  return (
    <StyledHome
      {...(window.location.href === "http://127.0.0.1:5173/"
        ? {
            className:
              "active nav-link rounded-circle d-flex justify-content-center align-items-center",
          }
        : {
            className:
              "nav-link rounded-circle d-flex justify-content-center align-items-center",
          })}
    >
      <Link
        to="/"
        title="Home"
        {...(window.location.href === "http://127.0.0.1:5173/"
          ? {
              className: "text-white",
            }
          : {
              className: "text-dark",
            })}
        style={{ width: "20px", height: "20px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="d-flex justify-content-center align-items-center bi bi-house-door-fill"
          viewBox="0 0 16 16"
        >
          <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
        </svg>
      </Link>
    </StyledHome>
  );
}
