import { Paper as MuiPaper } from '@mui/material';
import styled from 'styled-components';

import { getThemeMui } from '@/theme';

const themeMui = getThemeMui();
export const Paper = styled(MuiPaper)`
  width: 368px;
  border-radius: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 17px;
  padding: 16px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CardHeader = styled.p`
  font-feature-settings:
    'clig' off,
    'liga' off;

  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: semi-bold;
  line-height: 160%; /* 32px */
  letter-spacing: 0.15px;
  margin-left: 1px;
  flex: 1 0 0;
`;

export const Description = styled.p`
  width: 327px;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: 0.15px;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-right: 24px;
  margin-left: 24px;
`;

export const Breadcrumbs = styled.div`
  align-self: flex-start;
  margin-right: 24px;
  margin-left: 24px;
`;

export const Text = styled.div`
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 32px */
  letter-spacing: 0.15px;
  align-self: center;
  margin-right: 24px;
  margin-left: 24px;
  color: ${themeMui.palette.info.contrastText};
`;
export const SubText = styled.div`
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 80%;
  letter-spacing: 0.15px;
  align-self: center;
  margin-right: 24px;
  margin-left: 24px;
  color: ${themeMui.palette.info.contrastText};
`;

export const StyledImage = styled.div`
  opacity: 0.5;
`;
