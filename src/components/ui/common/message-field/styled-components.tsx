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
  max-width: 584px;

  @media only screen and (min-width: 369px) {
    width: calc(100% - 10px);
  }
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
  resize: none;
  color: #2d2d2d;
  background-color: transparent;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  autocomplete: off;
  padding: 0.5em 0;
  overflow-y: hidden;
`;

export const SendButton = styled(SendIcon)`
  cursor: pointer;
  color: ${themeMui.palette.primary.main};
  margin-left: 4px;
`;
