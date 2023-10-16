import { ReactElement, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import styled from 'styled-components';

const Container = styled.div`
  width: 390px;
  flex-shrink: 0;
  background: #fff;
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.15);
  display: flex;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

const TextArea = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  width: 100%;
  height: 2em;
  resize: vertical;
  color: #2d2d2d;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 400;
  padding: 0.5em 0;
  overflow-y: hidden;
`;

const SendButton = styled(SendIcon)`
  cursor: pointer;
  color: #a5a5a5;
  margin-left: 4px;
`;

interface IMessageFieldProperties {
  onClick: (message: string) => void;
}

export const MessageField = (
  properties: IMessageFieldProperties,
): ReactElement => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setMessage(event.target.value);
  };

  const handleSendClick = (): void => {
    properties.onClick(message);
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
