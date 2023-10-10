// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/no-null */
import React, { ReactElement } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface ISelectProperties {
  title: string;
  options: string[];
  onChange: (option: string) => void;
}

export const SelectOptions = (properties: ISelectProperties): ReactElement => {
  const [selectedOption, setSelectedOption] = React.useState<string>(
    properties.options[0],
  );

  const handleChange = (event: SelectChangeEvent): void => {
    setSelectedOption(event.target.value);
    properties.onChange(event.target.value);
  };
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="select-label">{properties.title}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={selectedOption}
          label={properties.title}
          onChange={handleChange}
        >
          {properties.options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
