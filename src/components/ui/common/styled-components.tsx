import { Paper as MuiPaper } from '@mui/material';
import styled from 'styled-components';

import { getThemeMui } from '@/theme';

const themeMui = getThemeMui();
export const GroupPaper = styled(MuiPaper)`
  width: 100%;
  border-radius: 20px;
  margin: 0 auto;
  max-width: 584px;

  @media only screen and (max-width: 600px) {
    width: calc(100% - 10px);
  }

  @media only screen and (min-width: 601px) {
    width: calc(50% - 10px);
    &:only-child {
      width: calc(100% - 10px);
    }
  }
`;

export const Paper = styled(MuiPaper)`
  border-radius: 20px;
  margin: 0 auto;
  padding: 0 10px;
  max-width: 584px;
  width: 100%;

  @media only screen and (min-width: 369px) {
    width: calc(100% - 10px);
  }
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
  width: 80%;
  max-width: 584px;
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
