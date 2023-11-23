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
  error = 'error',
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
  [ButtonVariant.error]: 'contained',
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
    | 'warning'
    | 'error',
    ButtonPropsVariantOverrides
  >
> = {
  [ButtonVariant.primary]: 'primary',
  [ButtonVariant.secondary]: 'secondary',
  [ButtonVariant.borderless]: 'primary',
  [ButtonVariant.outlined]: 'primary',
  [ButtonVariant.warning]: 'warning',
  [ButtonVariant.error]: 'error',
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
  const borderRadius = 50;
  const fontWeight = 600;
  const fontFamily = 'Roboto, sans-serif';
  const fontStyle = 'bold';

  return (
    <MaterialButton
      variant={VariantMap[variant]}
      color={ColorMap[variant]}
      onClick={onClick}
      disabled={disabled}
      style={{
        borderRadius,
        textTransform: 'none',
        fontSize: 16,
        boxShadow: 'none',
        fontWeight,
        fontFamily,
        fontStyle,
      }}
    >
      {children}
    </MaterialButton>
  );
}
