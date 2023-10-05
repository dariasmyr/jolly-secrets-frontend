import { ReactElement } from 'react';
import {
  Content,
  Description,
  Header,
  HeaderWrapper,
  Paper,
} from '@components/ui/email/card-email-toggle/style';
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
    <Paper>
      <Content>
        <HeaderWrapper>
          <Avatar variant="rounded">
            <AlternateEmailIcon />
          </Avatar>
          <Header>{properties.title}</Header>
          <Switch {...label} defaultChecked />
        </HeaderWrapper>
        <Description>{properties.description}</Description>
      </Content>
    </Paper>
  );
};
