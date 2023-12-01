import { ReactElement, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Card } from '@components/ui/common/card';
import {
  ContentWrapper,
  Header,
  Text,
  Wrapper,
} from '@components/ui/custom/notification/styled-components';
import { formatDistance, parseISO } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';

interface INotificationProperties {
  sender: string;
  date: string;
  text: string;
}

export const Notification = (
  properties: INotificationProperties,
): ReactElement => {
  const { locale: dateLocale } = useRouter();

  const formattedDate = useMemo(() => {
    const currentLocale = dateLocale === 'ru' ? ru : enUS;
    return formatDistance(parseISO(properties.date), new Date(), {
      addSuffix: true,
      locale: currentLocale,
    });
  }, [dateLocale, properties.date]);

  return (
    <Card
      content={
        <Wrapper>
          <img
            src={'/assets/secret_santa.png'}
            alt="avatar"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
            }}
          />
          <ContentWrapper>
            <Header>{`${properties.sender} • ${formattedDate}`}</Header>
            <Text>{properties.text}</Text>
          </ContentWrapper>
        </Wrapper>
      }
    />
  );
};
