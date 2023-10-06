import { ReactElement } from 'react';
import { customButtonStyle } from '@components/ui/button/super-buttom/style';
import { Button } from '@mui/material';

export enum CustomButtonVariant {
  participate = 'participate',
  expired = 'expired',
}

interface CustomButtonProperties {
  variant: CustomButtonVariant;
  date?: string;
}

export const CustomButton = ({
  variant,
  date,
}: CustomButtonProperties): ReactElement => {
  const styles = customButtonStyle(variant);
  let buttonText;

  switch (variant) {
    case CustomButtonVariant.participate: {
      buttonText = 'Участвовать';
      break;
    }
    case CustomButtonVariant.expired: {
      buttonText = `Завершено ${date}`;
      break;
    }
    default: {
      buttonText = 'Default';
      break;
    }
  }

  return <Button sx={{ ...styles }}>{buttonText}</Button>;
};
