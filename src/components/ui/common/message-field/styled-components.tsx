import SendIcon from '@mui/icons-material/Send';
import styled from 'styled-components';

import { getThemeMui } from '@/theme';

const themeMui = getThemeMui();

export const Container = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  flex-shrink: 0;
  background: ${themeMui.palette.background.default};
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.15);
  display: flex;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 8px;
`;

export const TextArea = styled.textarea`
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

export const SendButton = styled(SendIcon)`
  cursor: pointer;
  color: ${themeMui.palette.primary.main};
  margin-left: 4px;
`;
