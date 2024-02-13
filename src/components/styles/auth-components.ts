import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 450px;
  margin: 0 auto;
  padding: 70px 0px;
`;

export const Switcher = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ScrollBtn = styled.div`
  width: 60px;
  height: 60px;
  position: fixed;
  display: inline-grid;
  right: 1%;
  bottom: 15%;
  z-index: 1;
`;

export const Top = styled.div`
  height: 30px;
  text-align: center;
  font-weight: bold;
  font-size: 11px;
  padding: 10px 10px 5px 10px;
  border: none;
  border-radius: 30px 30px 0 0;
  cursor: pointer;
`;

export const Bottom = styled.div`
  height: 30px;
  text-align: center;
  font-weight: bold;
  font-size: 11px;
  padding: 5px 10px 10px 10px;
  border: none;
  border-radius: 0 0 30px 30px;
  cursor: pointer;
`;
