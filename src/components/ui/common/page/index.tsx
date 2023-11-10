import React, {
  CSSProperties,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
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
import { SvgIcon } from '@mui/material';

import { useAuthStore } from '@/store/auth.store';

const Logo: React.FC = () => (
  <LogoContainer>
    <Image src={'/assets/logo1.png'} width={320} height={150} alt="Logo" />
  </LogoContainer>
);

const PrimaryIcon = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => <SvgIcon color="primary">{children}</SvgIcon>;

export interface IPageProperties {
  title: string;
  children: ReactNode;
  style?: CSSProperties;
}

interface MenuItemProperties {
  icon: ReactElement;
  name: string;
  onClick?: () => void;
  isActive?: boolean;
}

const MenuItem = (properties: MenuItemProperties): ReactElement => {
  return (
    <MenuItemContainer
      onClick={properties.onClick}
      isActive={properties.isActive}
    >
      <IconContainer>{properties.icon}</IconContainer>
      <MenuOptionText>{properties.name}</MenuOptionText>
    </MenuItemContainer>
  );
};

export const Page = (properties: IPageProperties): ReactElement => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();
  const authStore = useAuthStore();

  useEffect(() => {
    if (!authStore.token || !authStore.account?.id) {
      router.push('/auth/login');
    }
  }, [authStore]);

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

  if (!router.isReady) return <div>Loading...</div>;
  console.log(authStore.account);
  return (
    <PageContainer style={properties.style}>
      <AppBar
        title={properties.title}
        onMenuClick={handleShowMenu}
        onAccountClick={(): void => {
          // eslint-disable-next-line no-alert
          alert('Account Clicked');
        }}
        avatarUrl={authStore.account?.avatarUrl || undefined}
      />
      <MenuContainer open={showMenu} onClick={handleHideMenu}>
        <Menu
          open={showMenu}
          onClick={(event): void => event.stopPropagation()}
        >
          <Logo />
          <MenuItem
            icon={
              <PrimaryIcon>
                <HomeIcon />
              </PrimaryIcon>
            }
            name={'Главная'}
            onClick={async (): Promise<void> => {
              await router.push('/public-groups');
            }}
            isActive={router.pathname === '/public-groups'}
          />
          <MenuItem
            icon={
              <PrimaryIcon>
                <GroupIcon />
              </PrimaryIcon>
            }
            name={'Мои группы'}
            onClick={async (): Promise<void> => {
              await router.push('/private-groups');
            }}
            isActive={router.pathname === '/private-groups'}
          />
          <MenuItem
            icon={
              <PrimaryIcon>
                <SettingsIcon />
              </PrimaryIcon>
            }
            name={'Настройки'}
            onClick={async (): Promise<void> => {
              await router.push('/settings');
            }}
            isActive={router.pathname === '/settings'}
          />
          <MenuItem
            icon={
              <PrimaryIcon>
                <NotificationsIcon />
              </PrimaryIcon>
            }
            name={'Уведомления'}
            onClick={async (): Promise<void> => {
              await router.push('/notifications');
            }}
            isActive={router.pathname === '/notifications'}
          />
          <MenuItem
            icon={
              <PrimaryIcon>
                <LogoutIcon />
              </PrimaryIcon>
            }
            name={'Выход'}
            onClick={async (): Promise<void> => {
              authStore.clear();
            }}
          />
        </Menu>
      </MenuContainer>
      {properties.children}
    </PageContainer>
  );
};
