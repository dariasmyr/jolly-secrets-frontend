import Image from 'next/image';
import styled from 'styled-components';

import { getThemeMui } from '@/theme';

const themeMui = getThemeMui();
export const ImageWrapper = styled(Image)`
  height: 25vw;
  border-radius: 20px 20px 0 0;
  object-fit: cover;
  width: 100%;
  min-width: 368px;
  @media only screen and (max-width: 430px) {
    height: 30vw;
  }

  @media only screen and (min-width: 431px) and (max-width: 769px) {
    height: 30vw;
  }

  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    height: 35vw;
  }

  @media only screen and (min-width: 1200px) {
    height: 36.25vw;
  }
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
