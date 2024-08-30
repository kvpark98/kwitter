import { Link } from "react-router-dom";
import styled from "@emotion/styled";

// 미디어 쿼리를 사용하여 스타일 정의
const StyledAccount = styled.div`
  width: 52px !important;
  height: 52px !important;
  padding: 16px !important;
`;

export default function SideBarNavAccount() {
  return (
    <StyledAccount
      {...(window.location.href.includes("account")
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
        to="/account"
        title="Account"
        {...(window.location.href.includes("account")
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
          className="d-flex justify-content-center align-items-center bi bi-gear-fill"
          viewBox="0 0 16 16"
        >
          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
        </svg>
      </Link>
    </StyledAccount>
  );
}
