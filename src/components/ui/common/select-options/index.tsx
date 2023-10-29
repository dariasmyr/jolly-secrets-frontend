import React, { ReactElement } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface ISelectProperties {
  title: string;
  options: string[];
  defaultOption: string;
  onChange: (option: string) => void;
}

export const SelectOptions = (properties: ISelectProperties): ReactElement => {
  const { options, defaultOption, onChange, title } = properties;
  const [selectedOption, setSelectedOption] = React.useState<string>(
    defaultOption || options[0],
  );

  const handleChange = (event: SelectChangeEvent): void => {
    setSelectedOption(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="select-label">{title}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={selectedOption}
          label={title}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
