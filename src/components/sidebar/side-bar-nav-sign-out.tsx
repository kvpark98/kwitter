import styled from "@emotion/styled";

// 미디어 쿼리를 사용하여 스타일 정의
const StyledSignOut = styled.div`
  width: 52px !important;
  height: 52px !important;
  padding: 16px !important;
`;

export interface SideBarNavSignOutProps {
  handleShowSignOutModal: () => void;
}

export default function SideBarNavSignOut({
  handleShowSignOutModal,
}: SideBarNavSignOutProps) {
  return (
    <StyledSignOut
      title="Sign out"
      className="btn btn-danger rounded-circle d-flex justify-content-center align-items-center border-0 mb-3"
      onClick={handleShowSignOutModal}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="d-flex justify-content-center align-items-center bi bi-box-arrow-left"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"
        />
        <path
          fillRule="evenodd"
          d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"
        />
      </svg>
    </StyledSignOut>
  );
}
