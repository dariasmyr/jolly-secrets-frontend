// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Message } from '@components/ui/common/message';
import { MessageField } from '@components/ui/common/message-field';
import { Page } from '@components/ui/common/page';
import { formatDistance, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import styled from 'styled-components';

import {
  useCreateMessageMutation,
  useMessagesQuery,
} from '@/generated/graphql';
import { useAuthStore } from '@/store/auth.store';

const formattedDate: (date: string) => string = (date) => {
  return formatDistance(parseISO(date), new Date(), {
    addSuffix: true,
    locale: ru,
  });
};

const Chat: FC = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const chatId = router.query.id;
  const [createMessage, { reset }] = useCreateMessageMutation({
    onCompleted: () => {
      refetch();
    },
  });

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

  useEffect(() => {
    if (!authStore.token || !authStore.account?.id) {
      router.push('/auth/login');
    }
  }, [authStore]);

  if (messagesAreLoading) {
    return <Page title="Чат с Тайным Сантой">Loading...</Page>;
  }

  if (messagesError) {
    return (
      <Page title="Чат с Тайным Сантой">
        Error: {JSON.stringify(messagesError)}
      </Page>
    );
  }

  return (
    <Page
      title={'Чат с Тайным Сантой'}
      style={{
        gap: 16,
        marginTop: 24,
        height: 'calc(100vh - 30px)',
      }}
      isChat={true}
    >
      <ChatContainer>
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
      </ChatContainer>
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
      ></MessageField>
    </Page>
  );
};

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  width: 100%;
  padding: 10px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default Chat;
