import { ReactElement } from 'react';
import { Card } from '@components/ui/common/card';
import {
  ContentWrapper,
  Header,
  Text,
  Wrapper,
} from '@components/ui/custom/notification/styled-components';
import Avatar from '@mui/material/Avatar';
import { formatDistance, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

interface INotificationProperties {
  sender: string;
  date: string;
  text: string;
}

export const Notification = (
  properties: INotificationProperties,
): ReactElement => {
  const formattedDate = formatDistance(parseISO(properties.date), new Date(), {
    addSuffix: true,
    locale: ru,
  });

  return (
    <Card
      content={
        <Wrapper>
          <Avatar>H</Avatar>
          <ContentWrapper>
            <Header>{`${properties.sender} • ${formattedDate}`}</Header>
            <Text>{properties.text}</Text>
          </ContentWrapper>
        </Wrapper>
      }
    />
  );
};
