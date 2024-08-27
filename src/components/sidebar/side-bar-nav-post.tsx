import styled from "@emotion/styled";

// 미디어 쿼리를 사용하여 스타일 정의
const StyledPost = styled.div`
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

export interface SideBarNavPostProps {
  handleShowCreateTweetModal: () => void;
}

export default function SideBarNavPost({
  handleShowCreateTweetModal,
}: SideBarNavPostProps) {
  return (
    <StyledPost
      title="Post"
      className="btn btn-primary rounded-circle d-flex justify-content-center align-items-center border-0 mb-3"
      onClick={handleShowCreateTweetModal}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="d-flex justify-content-center align-items-center bi bi-twitter"
        viewBox="0 0 16 16"
      >
        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15" />
      </svg>
    </StyledPost>
  );
}
