import styled from 'styled-components';

import { getThemeMui } from '@/theme';

export const Header = styled.p`
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 157%; /* 21.98px */
  letter-spacing: 0.1px;
`;

export const Text = styled.p`
  font-feature-settings:
    'clig' off,
    'liga' off;

  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 150%; /* 24px */
  letter-spacing: 0.15px;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  width: 100%;
  overflow: auto;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 5px;
  width: 100%;
  margin: 16px 0;
`;

export const NotificationCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  width: 100%;
  padding: 16px;
  border-radius: 15px;
  background-color: ${getThemeMui().palette.background.paper};
`;
