import { ReactElement, useState } from 'react';
import {
  Container,
  ContentWrapper,
  SendButton,
  TextArea,
} from '@components/ui/common/message-field/styled-components';

interface IMessageFieldProperties {
  onClick: (message: string) => void;
}

export const MessageField = (
  properties: IMessageFieldProperties,
): ReactElement => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async (): Promise<void> => {
    if (message.trim() === '') {
      return;
  };

    if (message.length > 200) {
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
          placeholder="Напишите сообщение..."
          value={message}
          onChange={handleMessageChange}
        />
        <SendButton onClick={handleSendClick} />
      </ContentWrapper>
    </Container>
  );
};
