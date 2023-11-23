import { ReactElement, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { GroupType, PriceRange } from '@/generated/graphql';

export interface ISelectProperties {
  title: string;
  options: {
    value: GroupType | PriceRange;
    label: string;
  }[];
  defaultOption: {
    value: GroupType | PriceRange;
    label: string;
  };
  onChange: (option: { value: GroupType | PriceRange; label: string }) => void;
}

export const SelectOptions = (properties: ISelectProperties): ReactElement => {
  const { options, defaultOption, onChange, title } = properties;
  const [selectedOption, setSelectedOption] = useState<GroupType | PriceRange>(
    defaultOption.value,
  );

  const handleChange = (event: SelectChangeEvent): void => {
    const selectedValue: GroupType = event.target.value as GroupType;
    setSelectedOption(selectedValue);

    const selectedObject = options.find(
      (option) => option.value === selectedValue,
    );

    if (selectedObject) {
      onChange(selectedObject);
    }
  };

  return (
    <div>
      <FormControl fullWidth sx={{ marginTop: '16px' }}>
        <InputLabel id="select-label">{title}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          variant={'standard'}
          value={selectedOption}
          label={title}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
