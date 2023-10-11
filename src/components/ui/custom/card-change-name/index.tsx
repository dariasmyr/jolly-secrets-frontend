import { ReactElement, useState } from 'react';
import { Card } from '@components/ui/common/card';
import { Wrapper } from '@components/ui/common/styled-components';
import TextField from '@mui/material/TextField';
import { Button, ButtonVariant } from 'src/components/ui/common/button';

interface ICardChangeNameProperties {
  onSaveClick: (name: string) => void;
  label: string;
  placeholder: string;
  button: string;
}

export const CardChangeName = (
  properties: ICardChangeNameProperties,
): ReactElement => {
  const [name, setName] = useState('');

  const handleSaveClick = (): void => {
    properties.onSaveClick(name);
  };

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setName(event.target.value);
  };

  return (
    <Card
      content={
        <Wrapper>
          <TextField
            fullWidth
            label={properties.label}
            placeholder={properties.placeholder}
            size="small"
            color="primary"
            value={name}
            onChange={handleNameChange}
          />
          <Button onClick={handleSaveClick} variant={ButtonVariant.primary}>
            {properties.button}
          </Button>
        </Wrapper>
      }
    />
  );
};
