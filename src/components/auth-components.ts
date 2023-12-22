import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 374px;
  margin: 0 auto;
  padding: 50px 0px;
`;
export const Title = styled.h1`
  font-size: 40px;
`;
export const Forms = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    background-color: #1d9bf0;
    color: white;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    margin-left: 5px;
    color: #1d9bf0;
  }
`;
