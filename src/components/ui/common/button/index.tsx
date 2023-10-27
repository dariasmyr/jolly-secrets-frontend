// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable security/detect-object-injection */
import { PropsWithChildren, ReactElement } from 'react';
import { Button as MaterialButton } from '@mui/material';
import { ButtonPropsVariantOverrides } from '@mui/material/Button/Button';
import { OverridableStringUnion } from '@mui/types';

export enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
  borderless = 'borderless',
  outlined = 'outlined',
  warning = 'warning',
}

const VariantMap: Record<
  ButtonVariant,
  OverridableStringUnion<
    'text' | 'outlined' | 'contained',
    ButtonPropsVariantOverrides
  >
> = {
  [ButtonVariant.primary]: 'contained',
  [ButtonVariant.secondary]: 'contained',
  [ButtonVariant.borderless]: 'text',
  [ButtonVariant.outlined]: 'outlined',
  [ButtonVariant.warning]: 'contained',
};

const ColorMap: Record<
  ButtonVariant,
  OverridableStringUnion<
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning',
    ButtonPropsVariantOverrides
  >
> = {
  [ButtonVariant.primary]: 'primary',
  [ButtonVariant.secondary]: 'secondary',
  [ButtonVariant.borderless]: 'primary',
  [ButtonVariant.outlined]: 'primary',
  [ButtonVariant.warning]: 'warning',
};

export function Button({
  disabled,
  children,
  onClick,
  variant = ButtonVariant.primary,
}: PropsWithChildren<{
  disabled?: boolean;
  onClick?: () => void;
  variant: ButtonVariant;
  textColor?: string;
}>): ReactElement {
  return (
    <MaterialButton
      variant={VariantMap[variant]}
      color={ColorMap[variant]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </MaterialButton>
  );
}
