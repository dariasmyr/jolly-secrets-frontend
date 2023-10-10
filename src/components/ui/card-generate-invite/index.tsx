import { ReactElement } from 'react';
import { Button, ButtonVariant } from '@components/ui/button';
import { Card } from '@components/ui/common/card';
import {
  ButtonWrapper,
  Description,
  Header,
  Wrapper,
} from '@components/ui/common/styled-components';

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
