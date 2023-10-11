import { ReactNode } from 'react';
import { CardCreateEvent } from '@components/ui/custom/card-create/card-create-event';
import { CardCreateGroup } from '@components/ui/custom/card-create/card-create-group';
import { CardCreatePreference } from '@components/ui/custom/card-create/card-create-preference';
import { DialogInputEmail } from '@components/ui/custom/dialog-input-email/input';
import { Button, ButtonVariant } from 'src/components/ui/common/button';
import { FabAdd } from 'src/components/ui/common/fab-add';
import { MenuOptions } from 'src/components/ui/common/menu-options';
import { TabApplications } from 'src/components/ui/common/tab-applications';
import { ButtonLarge } from 'src/components/ui/custom/button-large';
import { CardChangeName } from 'src/components/ui/custom/card-change-name';
import { CardDeleteAccount } from 'src/components/ui/custom/card-delete-account';
import { CardGenerateInvite } from 'src/components/ui/custom/card-generate-invite';
import {
  CardImage,
  ICardImageProperties,
} from 'src/components/ui/custom/card-image';
import { CardPreference } from 'src/components/ui/custom/card-preference';
import { CardEmailToggle } from 'src/components/ui/custom/card-toggle-email';
import { DialogChooseAccount } from 'src/components/ui/custom/dialog-choose-account';
import { DialogConfirmDelete } from 'src/components/ui/custom/dialog-confirm-delete';
import { DialogGenerateInvite } from 'src/components/ui/custom/dialog-generate-invite';

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

const tabs = [
  { label: 'Моя заявка', value: 'tab1' },
  { label: 'Заявка Тайного Санты', value: 'tab2' },
];

export default function IndexPage(): ReactNode {
  const handleTabChange = (tabValue: string): void => {
    console.log(`Selected tab: ${tabValue}`);
  };
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
        title={'Добавить участников'}
        description={'Нажми на кнопку чтобы сгенерировать приглашение.'}
        onGenerateInviteClick={handleClick}
        button={'Добавить участников'}
      />
      <CardEmailToggle
        title={textCardEmailToggleProperties.title}
        description={textCardEmailToggleProperties.description}
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
      <TabApplications tabs={tabs} onTabChange={handleTabChange} />
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
      <CardCreateGroup
        textFields={[
          { label: 'Название группы', multiline: false },
          { label: 'Описание группы', multiline: true },
        ]}
        accessLevelTitle="Уровень доступа"
        accessLevelOptions={['Публичная', 'Приватная']}
        onAccessLevelChange={handleClick}
      />
      <CardCreatePreference
        selectTitle="Ограничение по цене"
        priceOptions={[
          'Без ограничений',
          '1-10 USD',
          '10-100 USD',
          '100-1000 USD',
        ]}
        onPriceOptionChange={handleClick}
        textFields={[
          { label: 'Я НЕ хочу чтобы мне дарили', multiline: false, warn: true },
          { label: 'Я хочу чтобы мне дарили', multiline: false, warn: false },
          { label: 'Комментарий для поиска', multiline: true, warn: false },
        ]}
        onDeleteButtonClick={handleClick}
        button="Удалить"
      />
      <CardCreateEvent
        textFields={[
          { label: 'Название события', isMultiline: false },
          { label: 'Описание события', isMultiline: true },
        ]}
        dateRange={{ start: 'Начало', end: 'Конец' }}
      />{' '}
      <FabAdd onClick={handleClick} />
    </div>
  );
}
