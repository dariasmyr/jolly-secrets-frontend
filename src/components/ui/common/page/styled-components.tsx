import styled from 'styled-components';

interface IMenuProperties {
  open: boolean;
}

import { themeMui } from '@/theme';

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
`;

export const MenuItemContainer = styled.div<{ isActive?: boolean }>`
  background-color: ${({ isActive }): string =>
    isActive ? themeMui.palette.secondary.main : 'transparent'};
  display: flex;
  align-items: flex-start;
  padding: 8px 16px 8px 16px;
  width: 100%;
  cursor: pointer;
`;

export const IconContainer = styled.div`
  width: 18px;
  height: 18px;
  margin-right: 29px;
  flex-shrink: 0;
`;

export const MenuOptionText = styled.div`
  color: ${themeMui.palette.secondary.contrastText};
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  letter-spacing: 0.15px;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 0 0 0;
`;

export const Menu = styled.div<IMenuProperties>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${themeMui.palette.background.default};
  padding: 56px 0 0 0;
  width: 80%;
  max-width: 400px;
  height: 100vh;
  cursor: default;

  transform: ${({ open }): string =>
    open ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
`;

export const MenuContainer = styled.div<IMenuProperties>`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.61);
  width: 100%;
  height: 100%;
  z-index: 9999;
  cursor: pointer;

  // fade in slowly
  visibility: ${({ open }): string => (open ? 'visible' : 'hidden')};
  transition: visibility 0.2s ease-in-out;
`;

export const Header = styled.div`
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 32px */
  letter-spacing: 0.15px;
  align-self: flex-start;
  margin-right: 24px;
  margin-left: 24px;
`;
