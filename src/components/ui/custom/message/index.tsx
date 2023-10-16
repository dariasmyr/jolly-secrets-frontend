import { ReactElement } from 'react';
import styled from 'styled-components';

const MessageBase = styled.div`
  display: flex;
  padding: 4px;
  align-items: center;
  font-family: Roboto, sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.16px;
  color: var(--text-primary, rgba(0, 0, 0, 0.87));
`;

const OutgoingMessage = styled(MessageBase)`
  width: 156px;
  border-radius: 12px 12px 0 12px;
  background: rgba(0, 0, 0, 0.18);
`;

const IncomingMessage = styled(MessageBase)`
  width: 261px;
  border-radius: 12px 12px 12px 0;
  background: var(--action-selected, rgba(0, 0, 0, 0.08));
`;

interface IMessageProperties {
  text: string;
}

export const OutgoingMessageComponent = (
  properties: IMessageProperties,
): ReactElement => {
  return <OutgoingMessage>{properties.text}</OutgoingMessage>;
};

export const IncomingMessageComponent = (
  properties: IMessageProperties,
): ReactElement => {
  return <IncomingMessage>{properties.text}</IncomingMessage>;
};
