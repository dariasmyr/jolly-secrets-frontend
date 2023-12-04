import React, {
  CSSProperties,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { AppBar } from '@components/ui/common/app-bar';
import {
  ContentContainer,
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
import { Badge } from '@mui/material';

import { useCheckUnreadNotificationsQuery } from '@/generated/graphql';
import { useAuthStore } from '@/store/auth.store';

const Logo: React.FC = () => (
  <LogoContainer>
    <a href="/" style={{ cursor: 'pointer' }}>
      <Image
        src={'/assets/logo-horisontal.png'}
        width={213}
        height={68}
        alt="Logo"
      />
    </a>
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
  isChat?: boolean;
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
  const { t } = useTranslation(['menu']);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();
  const authStore = useAuthStore();

  useEffect(() => {
    if (!authStore.token || !authStore.account?.id) {
      router.push('/auth/login');
    }
  }, [authStore]);

  const { data, error, loading } = useCheckUnreadNotificationsQuery({});

  const handleShowMenu = (): void => {
    setShowMenu(true);
  };

  const handleBack = (): void => {
    router.back();
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!router.isReady || loading) return <div>Loading...</div>;

  return (
    <PageContainer style={properties.style}>
      <AppBar
        title={properties.title}
        onMenuClick={handleShowMenu}
        onAccountClick={(): void => {
          router.push('/settings');
        }}
        avatarUrl={authStore.account?.avatarUrl || undefined}
        {...(properties.isChat && {
          isChat: true,
          onBackClick: handleBack,
        })}
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
            name={t('menu:menu.public_groups')}
            onClick={async (): Promise<void> => {
              await router.push('/');
            }}
            isActive={router.pathname === '/'}
          />
          <MenuItem
            icon={
              <PrimaryIcon>
                <GroupIcon />
              </PrimaryIcon>
            }
            name={t('menu:menu.my_groups')}
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
            name={t('menu:menu.settings')}
            onClick={async (): Promise<void> => {
              await router.push('/settings');
            }}
            isActive={router.pathname === '/settings'}
          />
          <MenuItem
            icon={
              <Badge
                color="error"
                variant="dot"
                invisible={!data?.checkUnreadNotifications}
              >
                <NotificationsIcon color="primary" />
              </Badge>
            }
            name={t('menu:menu.notifications')}
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
            name={t('menu:menu.logout')}
            onClick={async (): Promise<void> => {
              authStore.clear();
            }}
          />
        </Menu>
      </MenuContainer>
      <ContentContainer>{properties.children}</ContentContainer>
    </PageContainer>
  );
};
