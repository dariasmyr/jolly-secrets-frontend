import { ReactElement, useState } from 'react';
import { AppBar } from '@components/ui/common/app-bar';
import styled from 'styled-components';

export interface IPageProperties {
  title: string;
  children: ReactElement;
}

export const Page = (properties: IPageProperties): ReactElement => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const switchMenu = (): void => {
    setShowMenu(!showMenu);
  };

  return (
    <PageContainer>
      <AppBar title={properties.title} onMenuClick={switchMenu} />
      <MenuContainer open={showMenu} onClick={switchMenu}>
        <Menu
          open={showMenu}
          onClick={(event): void => event.stopPropagation()}
        >
          <div>Menu</div>
          <div>Menu</div>
          <div>Menu</div>
          <div>Menu</div>
          <div>Menu</div>
        </Menu>
      </MenuContainer>
      {properties.children}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 0 0 0;
`;

const Menu = styled.div<IMenuProperties>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 56px 0 0 0;
  width: 80%;
  height: 100vh;

  transform: ${({ open }): string =>
    open ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
`;

interface IMenuProperties {
  open: boolean;
}

const MenuContainer = styled.div<IMenuProperties>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.61);
  width: 100%;
  height: 100%;
  z-index: 1;

  // fade in slowly
  opacity: ${({ open }): number => (open ? 1 : 0)};
  transition: opacity 0.1s ease-in-out;
`;
