import { ReactElement } from 'react';
import {
  IMenuProperties,
  MenuOptions,
} from '@components/ui/common/menu-options';
import { Tag } from '@components/ui/custom/card-image/tag';
import {
  Content,
  Header,
  HeaderWrapper,
  ImageWrapper,
  PreHeader,
  TagContainer,
  Text,
  Wrapper,
} from '@components/ui/custom/event-page/styled-components';

export interface ITag {
  title: string;
  warning?: boolean;
}

export interface IEventProperties {
  imageUrl: string;
  preHeader: string;
  header: string;
  text: string;
  tags: ITag[];
  menu?: IMenuProperties;
}

export const EventPage = (properties: IEventProperties): ReactElement => {
  return (
    <Wrapper>
      <ImageWrapper src={properties.imageUrl} alt="" width={368} height={200} />
      <Content>
        <HeaderWrapper>
          <PreHeader>{properties.preHeader}</PreHeader>
          {properties.menu && <MenuOptions options={properties.menu.options} />}
        </HeaderWrapper>
        <Header>{properties.header}</Header>
        <Text>{properties.text}</Text>
        <TagContainer>
          {properties.tags.map((tag, index) => (
            <Tag key={index} title={tag.title} warning={tag.warning} />
          ))}
        </TagContainer>
      </Content>
    </Wrapper>
  );
};
