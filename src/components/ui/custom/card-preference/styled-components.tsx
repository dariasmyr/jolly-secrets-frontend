import { Paper as MuiPaper } from '@mui/material';
import styled from 'styled-components';

export const Paper = styled(MuiPaper)`
  width: 368px;
  margin-top: 16px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 19px 0px 0px 23.3px;
  width: 264.879px;
  flex-shrink: 0;
`;

export const Header = styled.p`
  font-feature-settings:
    'clig' off,
    'liga' off;

  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: semi-bold;
  line-height: 160%; /* 32px */
  letter-spacing: 0.15px;
  margin-bottom: 20px;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  width: 264.879px;
  flex-shrink: 0;
  margin-bottom: 14px;
`;

export const Value = styled.p`
  font-feature-settings:
    'clig' off,
    'liga' off;

  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: 0.15px;
  width: 120%;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

export const Title = styled.p`
  font-feature-settings:
    'clig' off,
    'liga' off;

  font-family: Roboto, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 100% */
  letter-spacing: 0.15px;
`;

export const CardWrapper = styled.div`
  margin: 10px;
`;
