import styled from 'styled-components';

export const Header = styled.p`
  font-feature-settings:
    'clig' off,
    'liga' off;

  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
  line-height: 160%; /* 32px */
  letter-spacing: 0.15px;
  margin-left: 16px;
  flex: 1 0 0;
`;

export const HeaderWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  width: 327px;
`;
