import { Paper as MuiPaper } from '@mui/material';
import styled from 'styled-components';

export const Paper = styled(MuiPaper)`
  width: 368px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 19px 79.9px 0px 23.3px;
  width: 264.879px;
  flex-shrink: 0;
`;

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

export const Description = styled.p`
  width: 327px;
  color: #8d96a8;
  font-feature-settings:
    'clig' off,
    'liga' off;

  /* typography/body1 */
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: 0.15px;
  margin-bottom: 32.44px;
`;
