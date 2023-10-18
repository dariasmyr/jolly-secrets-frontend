import React, { CSSProperties, ReactElement, useEffect, useState } from 'react';
import { AppBar } from '@components/ui/common/app-bar';
import {
  IconContainer,
  LogoContainer,
  Menu,
  MenuContainer,
  MenuItemContainer,
  MenuOptionText,
  PageContainer,
} from '@components/ui/common/page/styled-components';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, SvgIcon } from '@mui/material';

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
    <MenuOptionText>{name}</MenuOptionText>
  </MenuItemContainer>
);

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
