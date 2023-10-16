import { ReactElement, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import styled from 'styled-components';

const Container = styled.div`
  width: 390px;
  height: var(--6, 48px);
  flex-shrink: 0;
  background: #fff;
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 8px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  width: 327px;
  color: #8d96a8;
  font-feature-settings:
    'clig' off,
    'liga' off;

  /* typography/body1 */
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: 0.15px;
`;

const SendButton = styled(SendIcon)`
  cursor: pointer;
  color: #a5a5a5;
`;
interface IMessageFieldProperties {
  onClick: (message: string) => void;
}

export const MessageField = (
  properties: IMessageFieldProperties,
): ReactElement => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
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
        <Input
          type="text"
          placeholder="Напишите сообщение..."
          value={message}
          onChange={handleMessageChange}
        />
        <SendButton onClick={handleSendClick} />
      </ContentWrapper>
    </Container>
  );
};
