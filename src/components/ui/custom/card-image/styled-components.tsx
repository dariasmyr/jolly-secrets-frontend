import Image from 'next/image';
import styled from 'styled-components';

import { themeMui } from '@/theme';

export const ImageWrapper = styled(Image)`
  width: 368px;
  height: 200px;
  border-radius: 20px 20px 0 0;
`;

export const PreHeader = styled.p`
  color: ${themeMui.palette.primary.light};

  font-feature-settings:
    'clig' off,
    'liga' off;

  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: bold;
`;

export const Header = styled.p`
  font-feature-settings:
    'clig' off,
    'liga' off;

  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: semi-bold;
  line-height: 160%; /* 32px */
  letter-spacing: 0.15px;
  margin-bottom: 10px;
`;

export const Text = styled.p`
  font-feature-settings:
    'clig' off,
    'liga' off;

  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: 0.15px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
`;

export const TagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 16px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
