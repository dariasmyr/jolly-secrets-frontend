import { ReactNode } from 'react';
import CollapsedBreadcrumbs from '@components/ui/common/breadcrumbs';
import { Page } from '@components/ui/common/page';
import { Stepper } from '@components/ui/common/stepper';
import { DialogInputEmail } from '@components/ui/custom/dialog-input-email';
import { Button, ButtonVariant } from 'src/components/ui/common/button';
import { FabAdd } from 'src/components/ui/common/fab-add';
import { MenuOptions } from 'src/components/ui/common/menu-options';
import { ButtonLarge } from 'src/components/ui/custom/button-large';
import { CardChangeName } from 'src/components/ui/custom/card-change-name';
import { CardDeleteAccount } from 'src/components/ui/custom/card-delete-account';
import { CardGenerateInvite } from 'src/components/ui/custom/card-generate-invite';
import {
  CardImage,
  ICardImageProperties,
} from 'src/components/ui/custom/card-image';
import { DialogChooseAccount } from 'src/components/ui/custom/dialog-choose-account';
import { DialogConfirmAction } from 'src/components/ui/custom/dialog-confirm-action';

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

const steps = [
  {
    label: 'Подготовка',
    description: 'Первый шаг в процессе',
    showDescription: true,
    completed: true,
  },
  {
    label: 'Исполнение',
    description: 'Второй шаг в процессе',
    showDescription: false,
    completed: false,
  },
  {
    label: 'Завершение',
    description: 'Третий и заключительный шаг в процессе',
    showDescription: true,
    completed: false,
  },
];

export default function IndexPage(): ReactNode {
  const handleClick = (): void => {
    // eslint-disable-next-line no-alert
    alert('click');
  };
  return (
    <Page
      title={'Home page'}
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
      <CollapsedBreadcrumbs
        steps={[
          { label: 'Публичные группы', link: '#', onClick: handleClick },
          { label: 'Тайные Санты Грушевки', link: '#', onClick: handleClick },
          {
            label: 'Событие: тайные санты грушевки',
            link: '#',
            onClick: handleClick,
          },
        ]}
      />
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
      <CardGenerateInvite
        title={'Добавить участников'}
        description={'Нажми на кнопку чтобы сгенерировать приглашение.'}
        onGenerateInviteClick={handleClick}
        button={'Добавить участников'}
      />
      <CardChangeName
        label="Имя пользователя"
        placeholder="Введите новое имя"
        onSaveClick={handleClick}
        button="Сохранить"
      />
      <CardDeleteAccount
        description={'Чтобы удалить аккаунт напишите “Удалить аккаунт”'}
        placeholder={'Удалить'}
        onDeleteButtonClick={handleClick}
        button={'Удалить'}
      />
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
      <DialogConfirmAction
        isOpen={false}
        title="Вы уверены?"
        description="После удаления аккаунта нельзя будет восстановить."
        cancelButtonText="Отмена"
        confirmButtonText="Да, удалить аккаунт"
        onCancelClick={handleClick}
        onConfirmClick={handleClick}
      />
      <DialogInputEmail
        initialEmail={''}
        isOpen={false}
        title="Укажите почту"
        onCancelClick={handleClick}
        onSaveClick={handleClick}
      />
      <DialogChooseAccount
        isOpen={false}
        title="Выберите аккаунт, который хотите оставить"
        description="У вас уже есть аккаунт, привязанный к Telegram/Google профилю. Выберите аккаунт, который хотите оставить, и мы привяжем к нему ваш Telegram/Google профиль."
        telegramButtonText="Аккаунт Telegram"
        googleButtonText="Аккаунт Google"
        cancelButtonText="Отмена"
        onTelegramClick={handleClick}
        onGoogleClick={handleClick}
        onCancelClick={handleClick}
      />
      <FabAdd onClick={handleClick} />
      <Stepper steps={steps} />
    </Page>
  );
}
