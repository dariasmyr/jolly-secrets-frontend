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
