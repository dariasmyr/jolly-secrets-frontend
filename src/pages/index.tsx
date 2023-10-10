import { ReactNode } from 'react';
import { Button, ButtonVariant } from '@components/ui/button';
import { CardCreateEvent } from '@components/ui/card-create/card-create-event';
import { CardCreateGroup } from '@components/ui/card-create/card-create-group';
import { CardCreatePreference } from '@components/ui/card-create/card-create-preference';
import { CardGenerateInvite } from '@components/ui/card-generate-invite';
import { CardImage, ICardImageProperties } from '@components/ui/card-image';
import { CardPreference } from '@components/ui/card-preference';
import { DialogChooseAccount } from '@components/ui/dialog/dialog-choose-account';
import { DialogGenerateInvite } from '@components/ui/dialog/dialog-generate-invite';
import { DialogInputEmail } from '@components/ui/dialog/dialog-input-email/input';
import { TabApplications } from '@components/ui/tab-applications';
import { ButtonLarge } from 'src/components/ui/button/button-large';
import { CardChangeName } from 'src/components/ui/card-change-name';
import {
  CardDeleteAccount,
  ICardDeleteInputProperties,
} from 'src/components/ui/card-delete-account';
import { CardEmailToggle } from 'src/components/ui/card-toggle-email';
import { MenuOptions } from 'src/components/ui/common/menu-options';
import { DialogConfirmDelete } from 'src/components/ui/dialog/dialog-confirm-delete';

const testCardDeleteInputProperties: ICardDeleteInputProperties = {
  description: 'Чтобы удалить аккаунт напишите “Удалить аккаунт”',
};

const testCardImageProperties: ICardImageProperties = {
  imageUrl: 'https://source.unsplash.com/random/368×200/?fruit',
  preHeader: 'Pre Header Text',
  header: 'Header Text',
  text: 'Body Text',
  tags: [
    {
      title: 'Test Tag 1',
      warning: true,
    },
    {
      title: 'Test Tag 2',
    },
    {
      title: 'Test Tag 3',
    },
  ],
  menu: {
    options: [
      {
        title: 'Изменить',
        onClick: (): void => {
          // eslint-disable-next-line no-alert
          alert('Изменить');
        },
      },
      {
        title: 'Удалить',
        onClick: (): void => {
          // eslint-disable-next-line no-alert
          alert('Удалить');
        },
      },
    ],
  },
};

const textCardPreferenceProperties = {
  header: 'Header Text',
  preferences: [
    {
      title: 'Диапазон',
      value: '1-10 USD',
    },
    {
      title: 'Я не хочу чтобы мне дарили',
      value: 'Сладости',
    },
    {
      title: 'Я хочу чтобы мне дарили',
      value: 'Книги',
    },
    {
      title: 'Комментарий для партнёра',
      value: 'Присылайте мне всё в офис 235',
    },
  ],
};

const textCardEmailToggleProperties = {
  title: 'Email',
  description: 'При включенной опции уведомления будут приходить на ваш емейл',
};

const textCardGenerateInviteProperties = {
  title: 'Добавить участников',
  description: 'Нажми на кнопку чтобы сгенерировать приглашение.',
};

export default function IndexPage(): ReactNode {
  const handleClick = (): void => {
    // eslint-disable-next-line no-alert
    alert('click');
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        gap: '20px',
        marginTop: '100px',
        marginBottom: '100px',
      }}
    >
      <Button onClick={handleClick} variant={ButtonVariant.primary}>
        я получил подарок
      </Button>
      <Button onClick={handleClick} variant={ButtonVariant.secondary}>
        я не получил подарок
      </Button>
      <Button onClick={handleClick} variant={ButtonVariant.borderless}>
        Отмена
      </Button>
      <Button onClick={handleClick} variant={ButtonVariant.warning}>
        Удалить
      </Button>
      <Button onClick={handleClick} variant={ButtonVariant.outlined}>
        Удалить
      </Button>
      <CardImage
        imageUrl={testCardImageProperties.imageUrl}
        text={testCardImageProperties.text}
        header={testCardImageProperties.header}
        preHeader={testCardImageProperties.preHeader}
        tags={testCardImageProperties.tags}
        menu={testCardImageProperties.menu}
      />
      <CardPreference
        header={textCardPreferenceProperties.header}
        preferences={textCardPreferenceProperties.preferences}
      />
      <CardGenerateInvite
        title={textCardGenerateInviteProperties.title}
        description={textCardGenerateInviteProperties.description}
      />
      <CardEmailToggle
        title={textCardEmailToggleProperties.title}
        description={textCardEmailToggleProperties.description}
      />
      <CardChangeName />
      <CardDeleteAccount
        description={testCardDeleteInputProperties.description}
      />
      <TabApplications />
      <ButtonLarge onClick={handleClick}>Хочу учавстовать!</ButtonLarge>
      <ButtonLarge disabled>Завершено 01.12.2023</ButtonLarge>
      <MenuOptions
        options={[
          {
            title: 'Изменить',
            onClick: (): void => {
              // eslint-disable-next-line no-alert
              alert('Изменить');
            },
          },
          {
            title: 'Удалить',
            onClick: (): void => {
              // eslint-disable-next-line no-alert
              alert('Удалить');
            },
          },
        ]}
      />
      <DialogConfirmDelete isOpen={false} />
      <DialogGenerateInvite isOpen={false} />
      <DialogInputEmail isOpen={false} />
      <DialogChooseAccount isOpen={false} />
      <CardCreateGroup />
      <CardCreatePreference />
      <CardCreateEvent />
    </div>
  );
}
