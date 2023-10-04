import { ReactElement } from 'react';
import {
  Content,
  Header,
  Paper,
  TextWrapper,
  Title,
  Value,
} from '@components/ui/card-preference/style';

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
