import { ReactElement } from 'react';
import {
  IncomingMessage,
  IncomingMessageWrapper,
  OutgoingMessage,
  OutgoingMessageWrapper,
} from '@components/ui/common/message/styled-components';

interface IMessageProperties {
  text: string;
}

export const OutgoingMessageComponent = (
  properties: IMessageProperties,
): ReactElement => {
  return (
    <OutgoingMessageWrapper>
      <OutgoingMessage>{properties.text}</OutgoingMessage>
    </OutgoingMessageWrapper>
  );
};

export const IncomingMessageComponent = (
  properties: IMessageProperties,
): ReactElement => {
  return (
    <IncomingMessageWrapper>
      <IncomingMessage>{properties.text}</IncomingMessage>
    </IncomingMessageWrapper>
  );
};
