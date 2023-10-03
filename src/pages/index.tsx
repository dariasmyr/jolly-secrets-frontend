import { ReactNode } from 'react';
import { Button, ButtonVariant } from '@components/ui/button';
import { CardImage, ICardImageProperties } from '@components/ui/card-image';

const testProperties: ICardImageProperties = {
  imageUrl: '/assets/cat.jpg',
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
        width: '80%',
        height: '50vh',
        alignItems: 'center',
        margin: '100px',
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
      <CardImage {...testProperties} />
    </div>
  );
}
