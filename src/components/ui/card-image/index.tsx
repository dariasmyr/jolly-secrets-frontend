import { ReactElement } from 'react';
import Image from 'next/image';
import { Tag } from '@components/ui/card-image/tag';
import { Paper as MuiPaper } from '@mui/material';
import styled from 'styled-components';

import { themeMui } from '@/theme';

export const CardImage = (): ReactElement => {
  return (
    <Paper>
      <ImageWrapper src="/assets/cat.jpg" alt="" width={368} height={200} />
      <Content>
        <PreHeader>Котик</PreHeader>
        <Header>Header</Header>
        <Text>Котик</Text>
        <TagContainer>
          <Tag title={'One'} />
          <Tag title={'Two'} warning />
          <Tag title={'Three'} />
        </TagContainer>
      </Content>
    </Paper>
  );
};

const Paper = styled(MuiPaper)`
  width: 368px;
`;

const ImageWrapper = styled(Image)`
  width: 368px;
  height: 200px;
  border-radius: 4px 5px 0 0;
`;

const PreHeader = styled.p`
  color: ${themeMui.palette.primary.main};

  font-feature-settings:
    'clig' off,
    'liga' off;

  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: bold;
`;

const Header = styled.p`
  font-feature-settings:
    'clig' off,
    'liga' off;

  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
  line-height: 160%; /* 32px */
  letter-spacing: 0.15px;
`;

const Text = styled.p`
  color: var(--text-secondary, rgba(0, 0, 0, 0.6));
  font-feature-settings:
    'clig' off,
    'liga' off;

  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: 0.15px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 16px;
`;
