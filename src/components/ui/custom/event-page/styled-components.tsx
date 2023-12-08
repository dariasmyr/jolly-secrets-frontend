import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 368px;
  margin: 0 auto;

  @media only screen and (max-width: 600px) {
    width: calc(100% - 10px);
  }

  @media only screen and (min-width: 601px) {
    width: calc(50% - 10px);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
`;

export const TagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 16px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
