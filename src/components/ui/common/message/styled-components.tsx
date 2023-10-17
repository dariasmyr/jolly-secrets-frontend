import styled from 'styled-components';

import { themeMui } from '@/theme';

export const MessageBase = styled.div`
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

export const OutgoingMessage = styled(MessageBase)`
  width: auto;
  max-width: 50vw;
  text-align: justify;
  border-radius: 12px 12px 0 12px;
  background-color: ${themeMui.palette.secondary.main};
  color: ${themeMui.palette.secondary.contrastText};
`;

export const IncomingMessage = styled(MessageBase)`
  width: auto;
  max-width: 50vw;
  text-align: justify;
  border-radius: 12px 12px 12px 0;
  background-color: ${themeMui.palette.primary.main};
  color: ${themeMui.palette.primary.contrastText};
`;

export const OutgoingMessageWrapper = styled.div`
  width: 390px;
  display: flex;
  justify-content: end;
`;

export const IncomingMessageWrapper = styled.div`
  width: 390px;
  display: flex;
  justify-content: start;
`;
