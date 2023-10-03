import { ReactElement } from 'react';
import { Paper as MuiPaper } from '@mui/material';
import styled from 'styled-components';

export interface ICardPreferenceProperties {
  header: string;
  preferences: IPreferenceTextProperties[];
}

export interface IPreferenceTextProperties {
  title: string;
  value: string;
}

export const CardPreference = (
  properties: ICardPreferenceProperties,
): ReactElement => {
  return (
    <Paper>
      <Content>
        <Header>{properties.header}</Header>
        <TextWrapper>
          {properties.preferences.map((preference, index) => (
            <Preference key={index} {...preference} />
          ))}
        </TextWrapper>
      </Content>
    </Paper>
  );
};

export const Preference = (
  properties: IPreferenceTextProperties,
): ReactElement => {
  return (
    <TextWrapper>
      <Value>{properties.value}</Value>
      <Title>{properties.title}</Title>
    </TextWrapper>
  );
};

export const Paper = styled(MuiPaper)`
  width: 368px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  color: #323232;
  font-feature-settings:
    'clig' off,
    'liga' off;

  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: 0.15px;
`;

export const Title = styled.p`
  color: #737373;
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
