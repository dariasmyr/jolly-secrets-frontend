import { ReactElement } from 'react';
import {
  CardWrapper,
  Content,
  Header,
  Paper,
  TextWrapper,
  Title,
  Value,
} from '@components/ui/custom/card-preference/styled-components';

export interface ICardPreferenceProperties {
  header: string;
  preferences: IPreferenceTextProperties[];
}

export interface IPreferenceTextProperties {
  priceRange: { title: string; value: string };
  likes: { title: string; value: string };
  dislikes: { title: string; value: string };
  comments: { title: string; value: string };
}

export const CardPreference = (
  properties: ICardPreferenceProperties,
): ReactElement => {
  return (
    <div>
      {properties.preferences.map((preference, index) => (
        <CardWrapper key={index}>
          <PreferenceCard
            key={index}
            preference={preference}
            preferenceNumber={index + 1}
          />
        </CardWrapper>
      ))}
    </div>
  );
};

export const PreferenceCard = (properties: {
  preference: IPreferenceTextProperties;
  preferenceNumber: number;
}): ReactElement => {
  return (
    <Paper>
      <Content>
        <Header>{`Предпочтение №${properties.preferenceNumber}`}</Header>
        <TextWrapper>
          <Preference {...properties.preference} />
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
      <Title>{properties.priceRange.title}</Title>
      <Value>{properties.priceRange.value}</Value>
      <Title>{properties.likes.title}</Title>
      <Value>{properties.likes.value}</Value>
      <Title>{properties.dislikes.title}</Title>
      <Value>{properties.dislikes.value}</Value>
      <Title>{properties.comments.title}</Title>
      <Value>{properties.comments.value}</Value>
    </TextWrapper>
  );
};
