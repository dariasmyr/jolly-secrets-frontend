import styled from 'styled-components';

import { themeMui } from '@/theme';

export const MessageBase = styled.div`
  display: flex;
  padding: 6px;
  align-items: center;
  font-family: Roboto, sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.16px;
  color: var(--text-primary, rgba(0, 0, 0, 0.87));
`;

export const StyledMessage = styled(MessageBase)<{ isOutgoing: boolean }>`
  width: auto;
  max-width: 50vw;
  text-align: justify;
  border-radius: ${(properties): string =>
    properties.isOutgoing ? '12px 12px 0 12px' : '12px 12px 12px 0'};
  background-color: ${(properties): string =>
    properties.isOutgoing
      ? themeMui.palette.primary.main
      : themeMui.palette.secondary.main};
  color: ${(properties): string =>
    properties.isOutgoing
      ? themeMui.palette.primary.contrastText
      : themeMui.palette.secondary.contrastText};
`;

export const MessageWrapper = styled.div<{ isOutgoing: boolean }>`
  width: 390px;
  display: flex;
  justify-content: ${(properties): string =>
    properties.isOutgoing ? 'flex-end' : 'flex-start'};
  padding: 10px;
`;
