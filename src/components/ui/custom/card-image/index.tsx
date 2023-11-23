import { ReactElement } from 'react';
import {
  IMenuProperties,
  MenuOptions,
} from '@components/ui/common/menu-options';
import { Paper } from '@components/ui/common/styled-components';
import {
  Content,
  Header,
  HeaderWrapper,
  ImageWrapper,
  PreHeader,
  TagContainer,
  Text,
} from '@components/ui/custom/card-image/styled-components';
import { Tag } from '@components/ui/custom/card-image/tag';

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
  menu?: IMenuProperties;
  onClick?: () => void;
}

export const CardImage = (properties: ICardImageProperties): ReactElement => {
  return (
    <Paper elevation={0}>
      <ImageWrapper
        onClick={properties.onClick}
        src={properties.imageUrl}
        alt=""
        width={368}
        height={200}
      />
      <Content>
        <HeaderWrapper>
          <PreHeader>{properties.preHeader}</PreHeader>
          {properties.menu && <MenuOptions options={properties.menu.options} />}
        </HeaderWrapper>
        <Header onClick={properties.onClick}>{properties.header}</Header>
        <Text onClick={properties.onClick}>{properties.text}</Text>
        <TagContainer onClick={properties.onClick}>
          {properties.tags.map((tag, index) => (
            <Tag key={index} title={tag.title} warning={tag.warning} />
          ))}
        </TagContainer>
      </Content>
    </Paper>
  );
};
