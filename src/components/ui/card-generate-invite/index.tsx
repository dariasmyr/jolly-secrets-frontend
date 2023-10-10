import { ReactElement } from 'react';
import { Button, ButtonVariant } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { ButtonWrapper, Description, Header } from '@components/ui/card/style';
import { Wrapper } from '@components/ui/card-generate-invite/style';

export interface ICardGenerateInviteProperties {
  title: string;
  description: string;
}

export const CardGenerateInvite = (
  properties: ICardGenerateInviteProperties,
): ReactElement => {
  const handleClick = (): void => {
    // eslint-disable-next-line no-alert
    alert('click');
  };
  return (
    <Card
      content={
        <Wrapper>
          <Header>{properties.title}</Header>
          <Description>{properties.description}</Description>
          <ButtonWrapper>
            <Button onClick={handleClick} variant={ButtonVariant.primary}>
              Сохранить
            </Button>
          </ButtonWrapper>
        </Wrapper>
      }
    />
  );
};
