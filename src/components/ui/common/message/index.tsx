import { ReactElement } from 'react';
import {
  MessageWrapper,
  StyledMessage,
  TimeContainer,
} from '@components/ui/common/message/styled-components';

interface IMessageProperties {
  text: string;
  isOutgoing: boolean;
  time: string;
}

export const Message = (properties: IMessageProperties): ReactElement => {
  return (
    <MessageWrapper isOutgoing={properties.isOutgoing}>
      <StyledMessage isOutgoing={properties.isOutgoing}>
        {properties.text}
      </StyledMessage>
      <TimeContainer>{properties.time}</TimeContainer>
    </MessageWrapper>
  );
};
