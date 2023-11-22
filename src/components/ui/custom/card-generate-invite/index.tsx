import { ReactElement } from 'react';
import { Card } from '@components/ui/common/card';
import {
  ButtonWrapper,
  CardHeader,
  Description,
  Wrapper,
} from '@components/ui/common/styled-components';
import { Button, ButtonVariant } from 'src/components/ui/common/button';

export interface ICardGenerateInviteProperties {
  title: string;
  description: string;
  onGenerateInviteClick: () => void;
  button: string;
}

export const CardGenerateInvite = (
  properties: ICardGenerateInviteProperties,
): ReactElement => {
  return (
    <Card
      content={
        <Wrapper>
          <CardHeader>{properties.title}</CardHeader>
          <Description>{properties.description}</Description>
          <ButtonWrapper>
            <Button
              onClick={properties.onGenerateInviteClick}
              variant={ButtonVariant.primary}
            >
              {properties.button}
            </Button>
          </ButtonWrapper>
        </Wrapper>
      }
    />
  );
};
