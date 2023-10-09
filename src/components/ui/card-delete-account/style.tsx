import { Paper as MuiPaper } from '@mui/material';
import styled from 'styled-components';

export const Paper = styled(MuiPaper)`
  width: 368px;
  display: flex;
`;

export const Content = styled.div`
  width: 368px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 17px;
  padding: 16px 20px 32px 16px;
  flex-shrink: 0;
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
