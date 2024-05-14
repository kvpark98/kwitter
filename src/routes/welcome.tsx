import styled from "@emotion/styled";

// 미디어 쿼리를 사용하여 스타일 정의
const StyledWelcome = styled.div`
  @media screen and (min-width: 900px) {
    display: flex !important;
    height: 100% !important;
    overflow-y: auto !important;
  }
  @media screen and (max-width: 900px) {
    display: block !important;
    height: 100% !important;
    overflow-y: auto !important;
  }
  @media screen and (max-width: 500px) {
    display: block !important;
    height: 100% !important;
    overflow-y: auto !important;
  }
`;

// 미디어 쿼리를 사용하여 스타일 정의
const StyledLogoDiv = styled.div`
  @media screen and (min-width: 700px) {
    display: flex !important;
    flex: 1 1 auto !important;
    justify-content: center !important;
    align-items: center !important;
  }
  @media screen and (max-width: 700px) {
    display: flex !important;
    flex: 1 1 auto !important;
    justify-content: center !important;
    align-items: center !important;
    margin: 30px 0 !important;
  }
`;

// 미디어 쿼리를 사용하여 스타일 정의
const StyledLogoSvg = styled.svg`
  @media screen and (min-width: 700px) {
    width: 300px !important;
    height: 300px !important;
  }
  @media screen and (max-width: 700px) {
    width: 100px !important;
    height: 100px !important;
  }
  @media screen and (max-width: 500px) {
    width: 80px !important;
    height: 80px !important;
  }
`;

// 미디어 쿼리를 사용하여 스타일 정의
const StyledTitle = styled.div`
  @media screen and (min-width: 700px) {
    font-size: 3rem !important;
  }
  @media screen and (max-width: 700px) {
    font-size: 2.5rem !important;
  }
  @media screen and (max-width: 500px) {
    font-size: 2rem !important;
  }
`;

// 미디어 쿼리를 사용하여 스타일 정의
const StyledP = styled.p`
  @media screen and (min-width: 700px) {
    font-size: 1.6rem !important;
    margin-bottom: 16px !important;
  }
  @media screen and (max-width: 700px) {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    font-size: 1.5rem !important;
    margin-bottom: 16px !important;
  }
  @media screen and (max-width: 500px) {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    font-size: 1.4rem !important;
    margin-bottom: 16px !important;
  }
`;

// 미디어 쿼리를 사용하여 스타일 정의
const StyledButton = styled.div`
  @media screen and (max-width: 700px) {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
`;

export default function Welcome() {
  return (
    <StyledWelcome>
      <StyledLogoDiv>
        <StyledLogoSvg
          xmlns="http://www.w3.org/2000/svg"
          width="300"
          height="300"
          fill="currentColor"
          className="bi bi-twitter-x"
          viewBox="0 0 16 16"
        >
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
        </StyledLogoSvg>
      </StyledLogoDiv>
      <div className="d-flex flex-fill justify-content-center align-items-center">
        <div className="d-flex flex-column row-gap-3">
          <StyledTitle className="fw-bold mb-5">
            Welcome to Kwitter!
          </StyledTitle>
          <div>
            <StyledP>New to Kwitter?</StyledP>
            <StyledButton className="btn btn-primary rounded-pill">
              Create an account
            </StyledButton>
          </div>
          <hr />
          <div>
            <StyledP>Already have an account?</StyledP>
            <StyledButton className="btn btn-outline-primary rounded-pill">
              Sign in
            </StyledButton>
          </div>
        </div>
      </div>
    </StyledWelcome>
  );
}
