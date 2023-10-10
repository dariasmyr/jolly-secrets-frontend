import { Paper as MuiPaper } from '@mui/material';
import styled from 'styled-components';

export const Paper = styled(MuiPaper)`
  width: 368px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
  padding: 16px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
`;
