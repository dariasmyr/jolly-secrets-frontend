import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 368px;
  margin: 0 auto;
  padding: 0 10px;
  max-width: 584px;

  @media only screen and (min-width: 369px) {
    width: calc(100% - 10px);
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
