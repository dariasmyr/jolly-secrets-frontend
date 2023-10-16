import { ReactElement, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import styled from 'styled-components';

const Container = styled.div`
  width: 390px;
  flex-shrink: 0;
  background: #fff;
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flexdirection: row;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

const TextArea = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  width: 100%;
  height: auto; /* Allow the textarea to grow in height */
  resize: vertical; /* Allow vertical resizing */
  color: #8d96a8;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: 0.15px;
  overflow-y: auto;
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
          placeholder="Напишите сообщение..."
          value={message}
          onChange={handleMessageChange}
        />
        <SendButton onClick={handleSendClick} />
      </ContentWrapper>
    </Container>
  );
};
