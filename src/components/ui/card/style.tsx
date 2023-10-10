import { Paper as MuiPaper } from '@mui/material';
import styled from 'styled-components';

export const Paper = styled(MuiPaper)`
  width: 368px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 17px;
  padding: 16px 20px 32px 16px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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
  margin-left: 1px;
  flex: 1 0 0;
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
`;
