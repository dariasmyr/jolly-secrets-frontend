import { ReactElement } from 'react';
import {
  Header,
  HeaderWrapper,
} from '@components/ui/card-toggle-email/styled-components';
import { Card } from '@components/ui/common/card';
import { Description, Wrapper } from '@components/ui/common/styled-components';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Avatar, Switch } from '@mui/material';

export interface ICardEmailToggleProperties {
  title: string;
  description: string;
}

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const CardEmailToggle = (
  properties: ICardEmailToggleProperties,
): ReactElement => {
  return (
    <Card
      content={
        <Wrapper>
          <HeaderWrapper>
            <Avatar variant="rounded">
              <AlternateEmailIcon />
            </Avatar>
            <Header>{properties.title}</Header>
            <Switch {...label} defaultChecked />
          </HeaderWrapper>
          <Description>{properties.description}</Description>
        </Wrapper>
      }
    />
  );
};
