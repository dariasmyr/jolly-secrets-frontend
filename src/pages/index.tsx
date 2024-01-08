import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, ButtonVariant } from '@components/ui/common/button';
import styled from 'styled-components';

import { getThemeMui } from '@/theme';
const themeMui = getThemeMui();

const Landing: FC = () => {
  const router = useRouter();

  const handlePlay = async (): Promise<void> => {
    await router.push('/public-groups');
  };

  return (
    <PageWrapper>
      <ImageWrapper>
        <Image
          src={'/assets/header.png'}
          layout="responsive"
          width={1920}
          height={1080}
          alt="header"
        />
      </ImageWrapper>
      <ContentWrapper>
        <HeaderWrapper>
          <TitleWrapper>
            <Title>Jolly Secrets</Title>
            <Subtitle>
              Лучший способ организовать тайный обмен подарками
            </Subtitle>
          </TitleWrapper>
          <Button variant={ButtonVariant.primary} onClick={handlePlay}>
            Начать играть
          </Button>
        </HeaderWrapper>
        <TutorialHeaderWrapper>
          <TutorialTitleWrapper>
            <TutorialTitle>Как это работает</TutorialTitle>
          </TutorialTitleWrapper>
        </TutorialHeaderWrapper>
        <TutorialContentWrapper>
          <TutorialDescriptionWrapper>
            <NumberIcon>1</NumberIcon>
            <TutorialDescription>
              Создайте группу, укажите название, описание и уровень доступа
              (приватный или публичный). Пригласите участников, отправив им
              ссылки-приглашения.
            </TutorialDescription>
          </TutorialDescriptionWrapper>
          <FrameWrapper>
            <Image
              src={'/assets/group-example-ru.png'}
              layout="responsive"
              width={1920}
              height={1080}
              alt="group-example"
            />
          </FrameWrapper>
        </TutorialContentWrapper>
        <TutorialContentWrapper>
          <TutorialDescriptionWrapper>
            <NumberIcon>2</NumberIcon>
            <TutorialDescription>
              В группе создайте событие для обмена подарками. Если не находите
              подходящее, создайте свое с указанием названия, описания и срока
              действия.
            </TutorialDescription>
          </TutorialDescriptionWrapper>
          <FrameWrapper>
            <Image
              src={'/assets/event-example-ru.png'}
              layout="responsive"
              width={1920}
              height={1080}
              alt="event-example"
            />
          </FrameWrapper>
        </TutorialContentWrapper>
        <TutorialContentWrapper>
          <TutorialDescriptionWrapper>
            <NumberIcon>3</NumberIcon>
            <TutorialDescription>
              Заполните заявку для участия в событии, указав свои предпочтения и
              ограничение по стоимости подарка. Мы подберем вам подходящего
              Тайного Санту и уведомим вас.
            </TutorialDescription>
          </TutorialDescriptionWrapper>
          <FrameWrapper>
            <Image
              src={'/assets/application-example-ru.png'}
              layout="responsive"
              width={1920}
              height={1080}
              alt="application-example"
            />
          </FrameWrapper>
        </TutorialContentWrapper>
        <TutorialContentWrapper>
          <TutorialDescriptionWrapper>
            <NumberIcon>4</NumberIcon>
            <TutorialDescription>
              Управляйте статусом исполнения своего желания и выполняйте желание
              вашего Тайного Санты через Тайный Чат, где можно обсудить все
              детали (например адрес или номер офиса).
            </TutorialDescription>
          </TutorialDescriptionWrapper>
          <FrameWrapper>
            <Image
              src={'/assets/application-status-example-ru.png'}
              layout="responsive"
              width={1920}
              height={1080}
              alt="application-status-example"
            />
          </FrameWrapper>
        </TutorialContentWrapper>
        <ButtonWrapper>
          <Button variant={ButtonVariant.primary} onClick={handlePlay}>
            Начать играть
          </Button>
        </ButtonWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'auth'])),
    },
  };
};

const Title = styled.div`
  text-align: center;
  font-feature-settings:
    'clig' off,
    'liga' off;

  /* typography/h5 */
  font-family: Roboto, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 133.4%; /* 32.016px */

  @media (min-width: 480px) {
    font-size: 32px;
  }

  @media (min-width: 768px) {
    font-size: 40px;
  }
`;

const Subtitle = styled.div`
  text-align: center;
  font-feature-settings:
    'clig' off,
    'liga' off;

  /* typography/body1 */
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */

  @media (min-width: 480px) {
    font-size: 18px;
  }

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const TutorialTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const TutorialTitle = styled.div`
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 133.4%;
`;

const TutorialContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 40px;
  }
`;

const TutorialDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;

  width: 100%;

  @media (min-width: 768px) {
    width: calc(40% - 20px);
  }
`;

const TutorialDescription = styled.div`
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

const NumberIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${themeMui.palette.warning.main};
  color: ${themeMui.palette.warning.contrastText};
  border-radius: 50%;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const FrameWrapper = styled.div`
  background-color: #e7f5ff;
  border-radius: 20px;
  padding: 16px;
  overflow: hidden;
  width: 100%;
  max-width: 480px;
  align-self: center;

  @media (min-width: 768px) {
    width: calc(60% - 20px);
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 10%;
  height: 100vh;
  gap: 16px;
`;

const ImageWrapper = styled.div`
  max-width: 100vw;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  gap: 20px;
  margin: 0 18px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const TutorialHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-self: center;
  margin: 20px 0 50px 0;
`;

export default Landing;
