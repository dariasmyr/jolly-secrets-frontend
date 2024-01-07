import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

import { GroupType, useCreateGroupMemberMutation } from '@/generated/graphql';
import { log } from '@/services/log';
import { useAuthStore } from '@/store/auth.store';

const Invite: FC = () => {
  const authStore = useAuthStore();
  const [createGroupMember] = useCreateGroupMemberMutation();
  const router = useRouter();
  const code = router.query.code;

  useEffect(() => {
    if (!authStore.token) {
      router.push('/auth/login');
    }
  }, [authStore]);

  useEffect(() => {
    (async (): Promise<void> => {
      if (!code) return;
      const { data: groupMemberData, errors } = await createGroupMember({
        variables: {
          code: code as string,
        },
      });

      if (errors) {
        log.error('errors', errors);
        return;
      }

      if (!groupMemberData) {
        log.error('No groupMemberData data');
        return;
      }

      if (groupMemberData.createGroupMember.group.type === GroupType.Private) {
        router.push(`/private-groups`);
        return;
      } else {
        router.push(`/public-groups`);
        return;
      }

      await router.push('/public-groups');
    })();
  }, [code]);

  if (!router.isReady) return <div>Loading...</div>;

  return <div>{code}</div>;
};

export default Invite;
