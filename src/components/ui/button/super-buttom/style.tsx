import { SxProps } from '@mui/system';

import { CustomButtonVariant } from './index';

export const customButtonStyle = (variant: CustomButtonVariant): SxProps => {
  let color;
  switch (variant) {
    case CustomButtonVariant.participate: {
      color = '#FF4081';
      break;
    }
    case CustomButtonVariant.expired: {
      color = '#2196F3';
      break;
    }
    default: {
      color = 'primary';
      break;
    }
  }

  return {
    width: '374px',
    height: '71px',
    backgroundColor: color,
    '&:hover': {
      backgroundColor: color,
    },
  };
};
