import { ReactElement } from 'react';
import {
  MessageWrapper,
  StyledMessage,
} from '@components/ui/common/message/styled-components';

interface IMessageProperties {
  text: string;
  isOutgoing: boolean;
}

export const Message = (properties: IMessageProperties): ReactElement => {
  return (
    <MessageWrapper isOutgoing={properties.isOutgoing}>
      <StyledMessage isOutgoing={properties.isOutgoing}>
        {properties.text}
      </StyledMessage>
    </MessageWrapper>
  );
};
