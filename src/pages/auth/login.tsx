import { FC } from 'react';
import Image from 'next/image';
import { Button, ButtonVariant } from '@components/ui/common/button';
import { Checkbox, FormControlLabel } from '@mui/material';
import styled from 'styled-components';

const Login: FC = () => {
  return (
    <PageWrapper>
      <Image src={'/assets/logo1.png'} width={230} height={100} alt="Logo" />
      <Title>Давайте познакомимся</Title>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label={
          <p>
            Я согласен(на) с <a href="#">правилами использования</a>
          </p>
        }
      />
      <Button variant={ButtonVariant.primary}>ВОЙТИ ЧЕРЕЗ GOOGLE</Button>
      <div>или</div>
      <Button variant={ButtonVariant.primary}>ВОЙТИ ЧЕРЕЗ TELEGRAM</Button>
    </PageWrapper>
  );
};

const Title = styled.div`
  color: var(--text-primary, rgba(0, 0, 0, 0.87));
  text-align: center;
  font-feature-settings:
    'clig' off,
    'liga' off;

  /* typography/h5 */
  font-family: Roboto, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 133.4%; /* 32.016px */
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 30%;
  height: 100vh;
  gap: 16px;
`;

export default Login;
