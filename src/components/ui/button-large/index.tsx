import styled from 'styled-components';

import { themeMui } from '@/theme';

interface IButtonLargeProperties {
  children: string;
  disabled?: boolean;
}
export const ButtonLarge = styled.button<IButtonLargeProperties>`
  width: 100%;
  height: 56px;
  border-radius: 4px;
  background-color: ${(properties): string =>
    properties.disabled ? '#F0F0F0' : themeMui.palette.primary.main};
  border: 1px solid #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.15px;
  color: ${(properties): string =>
    properties.disabled ? '#C0C0C0' : themeMui.palette.primary.contrastText};
  cursor: ${(properties): string =>
    properties.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease-in-out;
  box-shadow: ${(properties): string =>
    properties.disabled ? 'none' : '0px 2px 3px rgba(51, 51, 51, 0.2)'};
  &:hover {
    background-color: ${(properties): string =>
      properties.disabled ? '#F0F0F0' : themeMui.palette.primary.dark};
  }
  &:active {
    background-color: ${(properties): string =>
      properties.disabled ? '#F0F0F0' : themeMui.palette.primary.main};
  }
`;
