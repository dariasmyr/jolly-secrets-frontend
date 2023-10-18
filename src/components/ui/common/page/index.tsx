import React, { CSSProperties, ReactElement, useEffect, useState } from 'react';
import { AppBar } from '@components/ui/common/app-bar';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, SvgIcon } from '@mui/material';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

const Logo: React.FC = () => (
  <LogoContainer>
    <Box
      component="img"
      src={'/assets/secret_santa.png'}
      sx={{ maxWidth: '200px', maxHeight: '200px' }}
      alt="Logo"
    />
  </LogoContainer>
);

const PrimaryIcon = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => <SvgIcon color="primary">{children}</SvgIcon>;

const menuItems = [
  {
    name: 'Главная',
    link: '/home',
    icon: (
      <PrimaryIcon>
        <HomeIcon />
      </PrimaryIcon>
    ),
  },
  {
    name: 'Мои группы',
    link: '/groups',
    icon: (
      <PrimaryIcon>
        <GroupIcon />
      </PrimaryIcon>
    ),
  },
  {
    name: 'Настройки',
    link: '/settings',
    icon: (
      <PrimaryIcon>
        <SettingsIcon />
      </PrimaryIcon>
    ),
  },
  {
    name: 'Уведомления',
    link: '/notifications',
    icon: (
      <PrimaryIcon>
        <NotificationsIcon />
      </PrimaryIcon>
    ),
  },
  {
    name: 'Выход',
    link: '/logout',
    icon: (
      <PrimaryIcon>
        <LogoutIcon />
      </PrimaryIcon>
    ),
  },
];

export interface IPageProperties {
  title: string;
  children: ReactElement | ReactElement[];
  style?: CSSProperties;
}

interface MenuItemProperties {
  icon: ReactElement;
  name: string;
  link: string;
}

const MenuItem: React.FC<MenuItemProperties> = ({ icon, name }) => (
  <MenuItemContainer>
    <IconContainer>{icon}</IconContainer>
    <Text>{name}</Text>
  </MenuItemContainer>
);

const MenuItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 8px;
  cursor: pointer;
`;

const IconContainer = styled.div`
  width: 18px;
  height: 18px;
  margin-right: 29px;
  flex-shrink: 0;
`;

const Text = styled.div`
  color: #000;
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  letter-spacing: 0.15px;
`;

export const Page = (properties: IPageProperties): ReactElement => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleShowMenu = (): void => {
    setShowMenu(true);
  };

  const handleHideMenu = (): void => {
    setShowMenu(false);
  };

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') handleHideMenu();
    };

    document.addEventListener('keydown', onKeydown);

    setShowMenu(false);

    return () => document.removeEventListener('keydown', onKeydown);
  }, []);

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
          <Logo />
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              name={item.name}
              link={item.link}
            />
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
  align-items: flex-start;
  background-color: #ffffff;
  padding: 56px 0 0 0;
  width: 80%;
  max-width: 400px;
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
