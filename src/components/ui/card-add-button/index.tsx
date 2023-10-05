import { ReactElement } from 'react';
import { Button, ButtonVariant } from '@components/ui/button';
import {
  ButtonWrapper,
  Content,
  Description,
  Header,
  Paper,
} from '@components/ui/card-add-button/style';

export interface ICardAddButtonProperties {
  title: string;
  description: string;
}

export const CardAddButton = (
  properties: ICardAddButtonProperties,
): ReactElement => {
  const handleClick = (): void => {
    // eslint-disable-next-line no-alert
    alert('click');
  };
  return (
    <Paper>
      <Content>
        <Header>{properties.title}</Header>
        <Description>{properties.description}</Description>
        <ButtonWrapper>
          <Button onClick={handleClick} variant={ButtonVariant.primary}>
            Сохранить
          </Button>
        </ButtonWrapper>
      </Content>
    </Paper>
  );
};
