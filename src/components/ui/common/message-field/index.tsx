import React, { ReactElement, useState } from 'react';
import {
  Container,
  ContentWrapper,
  SendButton,
  TextArea,
} from '@components/ui/common/message-field/styled-components';

interface IMessageFieldProperties {
  onClick: (message: string) => void;
  placeholder: string;
}

export const MessageField = ({
  onClick,
  placeholder,
}: IMessageFieldProperties): ReactElement => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setMessage(event.target.value);
  };

  const handleSendClick = async (): Promise<void> => {
    if (message.trim() === '' || message.length > 200) {
      return;
    }

    await onClick(message);
    setMessage('');
  };

  return (
    <Container>
      <ContentWrapper>
        <TextArea
          maxLength={200}
          placeholder={placeholder}
          value={message}
          onChange={handleMessageChange}
        />
        <SendButton onClick={handleSendClick} />
      </ContentWrapper>
    </Container>
  );
};
