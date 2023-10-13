import { ReactElement } from 'react';
import { Card } from '@components/ui/common/card';
import {
  ContentWrapper,
  Header,
  Text,
  Wrapper,
} from '@components/ui/custom/notification/styled-components';
import Avatar from '@mui/material/Avatar';

interface INotificationProperties {
  sender: string;
  date: string;
  text: string;
}

export const Notification = (
  properties: INotificationProperties,
): ReactElement => {
  return (
    <Card
      content={
        <Wrapper>
          <Avatar>H</Avatar>
          <ContentWrapper>
            <Header>{`${properties.sender} • ${properties.date}`}</Header>
            <Text>{properties.text}</Text>
          </ContentWrapper>
        </Wrapper>
      }
    />
  );
};
