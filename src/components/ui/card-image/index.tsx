import { ReactElement } from 'react';
import { Tag } from '@components/ui/card-image/tag';

import {
  Content,
  Header,
  ImageWrapper,
  Paper,
  PreHeader,
  TagContainer,
  Text,
} from '@components/ui/card-image/styles';

export interface ITag {
  title: string;
  warning?: boolean;
}
export interface ICardImageProperties {
  imageUrl: string;
  preHeader: string;
  header: string;
  text: string;
  tags: ITag[];
}

export const CardImage = (properties: ICardImageProperties): ReactElement => {
  return (
    <Paper>
      <ImageWrapper src={properties.imageUrl} alt="" width={368} height={200} />
      <Content>
        <PreHeader>{properties.preHeader}</PreHeader>
        <Header>{properties.header}</Header>
        <Text>{properties.text}</Text>
        <TagContainer>
          {properties.tags.map((tag, index) => (
            <Tag key={index} title={tag.title} warning={tag.warning} />
          ))}
        </TagContainer>
      </Content>
    </Paper>
  );
};
