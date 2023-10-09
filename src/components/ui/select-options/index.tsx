// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import React, { ReactElement } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface ISelectOption {
  title: string;
  onClick: () => void;
}

export interface ISelectProperties {
  title: string;
  options: ISelectOption[];
}

export const SelectOptions = (properties: ISelectProperties): ReactElement => {
  const [optionSelect, setOptionSelect] = React.useState('');

  const handleChange = (event: SelectChangeEvent): void => {
    setOptionSelect(event.target.value as string);
  };
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="select-label">{properties.title}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={optionSelect}
          label={properties.title}
          onChange={handleChange}
        >
          {properties.options.map((option, index) => (
            <MenuItem
              key={index}
              onClick={(): void => {
                option.onClick();
              }}
            >
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
