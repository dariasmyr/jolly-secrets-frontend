import { CSSProperties, ReactElement, useState } from 'react';
import { AppBar } from '@components/ui/common/app-bar';
import styled from 'styled-components';

export interface IPageProperties {
  title: string;
  children: ReactElement | ReactElement[];
  style?: CSSProperties;
}

export const Page = (properties: IPageProperties): ReactElement => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleShowMenu = (): void => {
    setShowMenu(true);
  };

  const handleHideMenu = (): void => {
    setShowMenu(false);
  };

  return (
    <PageContainer style={properties.style}>
      <AppBar
        title={properties.title}
        onMenuClick={handleShowMenu}
        onAccountClick={(): void => {
          // eslint-disable-next-line no-alert
          alert('Account Clicked');
        }}
      />
      <MenuContainer open={showMenu} onClick={handleHideMenu}>
        <Menu
          open={showMenu}
          onClick={(event): void => event.stopPropagation()}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              style={{ cursor: 'pointer', padding: '8px' }}
              onClick={(): void => {
                // eslint-disable-next-line no-alert
                alert(`Menu ${index + 1} Clicked`);
              }}
            >
              Menu {index + 1}
            </div>
          ))}
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

interface IMenuProperties {
  open: boolean;
}

const Menu = styled.div<IMenuProperties>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 56px 0 0 0;
  width: 80%;
  height: 100vh;
  cursor: default;

  transform: ${({ open }): string =>
    open ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
`;

const MenuContainer = styled.div<IMenuProperties>`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.61);
  width: 100%;
  height: 100%;
  z-index: 9999;
  cursor: pointer;

  // fade in slowly
  visibility: ${({ open }): string => (open ? 'visible' : 'hidden')};
  transition: visibility 0.2s ease-in-out;
`;
