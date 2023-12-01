// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import { FC, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Message } from '@components/ui/common/message';
import { MessageField } from '@components/ui/common/message-field';
import { Page } from '@components/ui/common/page';
import { formatDistance, parseISO } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import styled from 'styled-components';

import {
  useCreateMessageMutation,
  useMessagesQuery,
} from '@/generated/graphql';
import { useSocketIo } from '@/services/use-socket-io';
import { useAuthStore } from '@/store/auth.store';

const Chat: FC = () => {
  const { t } = useTranslation(['chat']);
  const authStore = useAuthStore();
  const router = useRouter();
  const chatId = router.query.id;
  const [createMessage, { reset }] = useCreateMessageMutation({
    onCompleted: () => {
      refetch();
    },
  });
  const { locale: dateLocale } = useRouter();
  const formattedDate: (date: string) => string = (date) => {
    const currentLocale = dateLocale === 'ru' ? ru : enUS;
    return formatDistance(parseISO(date), new Date(), {
      addSuffix: true,
      locale: currentLocale,
    });
  };

  const {
    data: messagesData,
    error: messagesError,
    loading: messagesAreLoading,
    refetch,
  } = useMessagesQuery({
    variables: {
      chatId: Number(chatId),
    },
  });

  const messageEndReference = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messageEndReference.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesData]);

  const socket = useSocketIo();

  useEffect(() => {
    console.log('Subscribe to socket.io');
    socket.on('new_message', (parameters) => {
      console.log('NEW MESSAGE:', parameters);
      refetch();
    });

    return () => {
      console.log('Unsubscribe to socket.io');
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!authStore.token || !authStore.account?.id) {
      router.push('/auth/login');
    }
  }, [authStore]);

  if (messagesAreLoading) {
    // eslint-disable-next-line sonarjs/no-duplicate-string
    return <Page title={t('chat:chat.title')}>Loading...</Page>;
  }

  if (messagesError) {
    return (
      <Page title={t('chat:chat.title')}>
        Error: {JSON.stringify(messagesError)}
      </Page>
    );
  }

  return (
    <Page
      title={t('chat:chat.title')}
      style={{
        gap: 16,
        marginTop: 24,
        height: 'calc(100vh - 30px)',
      }}
      isChat={true}
    >
      <MessageWrapper>
        {messagesData?.messages?.map((message) => {
          return (
            <MessageContainer key={message.id}>
              <Message
                time={formattedDate(message.createdAt)}
                text={message.text}
                isOutgoing={message.accountId === authStore.account?.id}
              ></Message>
            </MessageContainer>
          );
        })}
        <div ref={messageEndReference} />
      </MessageWrapper>
      <MessageField
        onClick={async (text): Promise<void> => {
          const createMessageResponse = await createMessage({
            variables: {
              chatId: Number(chatId),
              accountId: Number(authStore.account?.id),
              text: text,
            },
          });
          if (createMessageResponse.data?.createMessage) {
            reset();
          }
        }}
        placeholder={t('chat:chat.placeholder')}
      ></MessageField>
    </Page>
  );
};

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 50px;
`;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['chat'])),
    },
  };
};

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default Chat;
