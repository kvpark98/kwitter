import { Link } from "react-router-dom";
import styled from "@emotion/styled";

// 미디어 쿼리를 사용하여 스타일 정의
const StyledProfile = styled.div`
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
  @media screen and (max-width: 500px) {
    width: 46px !important;
    height: 46px !important;
    padding: 13px !important;
  }
`;

export default function SideBarNavProfile() {
  return (
    <StyledProfile
      {...(window.location.href.includes("profile")
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
        to="/profile"
        title="Profile"
        {...(window.location.href.includes("profile")
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
          className="d-flex justify-content-center align-items-center bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg>
      </Link>
    </StyledProfile>
  );
}
