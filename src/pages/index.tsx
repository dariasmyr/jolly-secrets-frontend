import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, ButtonVariant } from '@components/ui/common/button';
import styled, { keyframes } from 'styled-components';

import { getThemeMui } from '@/theme';
const themeMui = getThemeMui();

const Landing: FC = () => {
  const router = useRouter();

  const handlePlay = async (): Promise<void> => {
    await router.push('/public-groups');
  };

  return (
    <PageWrapper>
      <HeaderImageWrapper>
        <HeaderImage />
      </HeaderImageWrapper>
      <LogoBoxWrapper>
        <Image
          src={'/assets/logo-box.png'}
          layout="responsive"
          width={150}
          height={150}
          alt="logo-box"
        />
      </LogoBoxWrapper>
      <ContentWrapper>
        <HeaderWrapper>
          <LogoTitleWrapper>
            <Image
              src={'/assets/logo-title.png'}
              layout="responsive"
              width={220}
              height={60}
              alt="logo-title"
            />
          </LogoTitleWrapper>
          <TitleWrapper>
            <Subtitle>
              Лучший способ организовать тайный обмен подарками!
            </Subtitle>
          </TitleWrapper>
          <ButtonWrapperHeader>
            <Button variant={ButtonVariant.primary} onClick={handlePlay}>
              Начать играть
            </Button>
          </ButtonWrapperHeader>
        </HeaderWrapper>
        <TutorialHeaderWrapper>
          <TutorialTitleWrapper>
            <TutorialTitle>Как это работает</TutorialTitle>
          </TutorialTitleWrapper>
        </TutorialHeaderWrapper>
        <TutorialContentWrapper>
          <TutorialDescriptionWrapper>
            <TutorialStepWrapper>
              <NumberIcon>1</NumberIcon>
              <TutorialStepTitle>Создайте группу</TutorialStepTitle>
            </TutorialStepWrapper>
            <TutorialDescription>
              Внутри группы укажите название, описание и уровень доступа (
              <strong>приватный</strong> или <strong>публичный</strong>).
              Пригласите участников, отправив им ссылки-приглашения.
            </TutorialDescription>
          </TutorialDescriptionWrapper>
          <FrameWrapper>
            <ImageWrapper>
              <Image
                src={'/assets/group-example-ru.png'}
                layout="responsive"
                width={480}
                height={390}
                alt="group-example"
              />
            </ImageWrapper>
          </FrameWrapper>
        </TutorialContentWrapper>
        <TutorialContentWrapper>
          <TutorialDescriptionWrapper>
            <TutorialStepWrapper>
              <NumberIcon>2</NumberIcon>
              <TutorialStepTitle>Cоздайте событие</TutorialStepTitle>
            </TutorialStepWrapper>
            <TutorialDescription>
              Если не находите подходящее, вы можете создайть свое!
            </TutorialDescription>
          </TutorialDescriptionWrapper>
          <FrameWrapper>
            <ImageWrapper>
              <Image
                src={'/assets/event-example-ru.png'}
                layout="responsive"
                width={480}
                height={390}
                alt="event-example"
              />
            </ImageWrapper>
          </FrameWrapper>
        </TutorialContentWrapper>
        <TutorialContentWrapper>
          <TutorialDescriptionWrapper>
            <TutorialStepWrapper>
              <NumberIcon>3</NumberIcon>
              <TutorialStepTitle>Заполните заявку</TutorialStepTitle>
            </TutorialStepWrapper>
            <TutorialDescription>
              Укажите свои предпочтения и ограничение по стоимости подарка. А мы
              подберем вам подходящего партнера!
            </TutorialDescription>
          </TutorialDescriptionWrapper>
          <FrameWrapper>
            <ImageWrapper>
              <Image
                src={'/assets/application-example-ru.png'}
                layout="responsive"
                width={480}
                height={390}
                alt="application-example"
              />
            </ImageWrapper>
          </FrameWrapper>
        </TutorialContentWrapper>
        <TutorialContentWrapper>
          <TutorialDescriptionWrapper>
            <TutorialStepWrapper>
              <NumberIcon>4</NumberIcon>
              <TutorialStepTitle>Обновляйте статусы</TutorialStepTitle>
            </TutorialStepWrapper>
            <TutorialDescription>
              Обновляйте статус исполнения желания вашего партнера и следите за
              своим статусом! Все детали можно обсудить с вашим партнером в
              Тайном Чате!
            </TutorialDescription>
          </TutorialDescriptionWrapper>
          <FrameWrapper>
            <ImageWrapper>
              <Image
                src={'/assets/application-status-example-ru.png'}
                layout="responsive"
                width={480}
                height={390}
                alt="application-status-example"
              />
            </ImageWrapper>
          </FrameWrapper>
        </TutorialContentWrapper>
        <ButtonWrapperFooter>
          <Button variant={ButtonVariant.primary} onClick={handlePlay}>
            Начать играть
          </Button>
        </ButtonWrapperFooter>
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

// const Title = styled.div`
//   text-align: center;
//   font-feature-settings:
//     'clig' off,
//     'liga' off;
//
//   /* typography/h5 */
//   font-family: Roboto, sans-serif;
//   font-size: 24px;
//   font-style: normal;
//   font-weight: 600;
//   line-height: 133.4%; /* 32.016px */
//
//   @media (min-width: 480px) {
//     font-size: 32px;
//   }
//
//   @media (min-width: 768px) {
//     font-size: 40px;
//   }
// `;

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
  font-size: 22px;
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
  background-color: #f2f3fa;
  border-radius: 20px;
  padding: 16px;
  overflow: hidden;
  width: 100%;
  max-width: 600px;
  align-self: center;

  display: flex;
  justify-content: center;
  align-items: center;

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

const HeaderImageWrapper = styled.div`
  max-width: 100vw;
  width: 100%;
`;

const ImageWrapper = styled.div`
  max-width: 480px;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1240px;
  gap: 20px;
  margin: 0 20px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TutorialHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
`;

const ButtonWrapperFooter = styled.div`
  display: flex;
  align-self: center;
  margin: 20px 0 50px 0;
`;

const ButtonWrapperHeader = styled.div`
  display: flex;
  align-self: center;
  margin: 40px 0;
`;

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const LogoBoxWrapper = styled.div`
  max-width: 100px;
  width: 100%;
  animation: ${bounceAnimation} 2s cubic-bezier(0.68, -0.55, 0.27, 1.55)
    infinite;

  @media (min-width: 480px) {
    max-width: 150px;
  }
`;

const LogoTitleWrapper = styled.div`
  max-width: 220px;
  width: 100%;
  @media (min-width: 480px) {
    max-width: 300px;
  }
`;

const HeaderImage = styled.div`
  height: 10vh;
  width: 100%;
  background: linear-gradient(180deg, #a2c9ff 0%, rgba(137, 153, 226, 0) 100%);
`;

const TutorialStepWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const TutorialStepTitle = styled.div`
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 133.4%;
`;

export default Landing;
