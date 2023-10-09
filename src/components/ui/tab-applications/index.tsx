import React, { useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';

export const TabApplications = (): React.ReactElement => {
  const [activeTab, setActiveTab] = useState('1');

  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    newValue: string,
  ): unknown => {
    return setActiveTab(newValue);
  };

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <TabContext value={activeTab}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Моя Заявка" value="1" />
          <Tab label="Заявка Тайного Санты" value="2" />
        </TabList>
        <TabPanel value="1">Моя Заявка</TabPanel>
        <TabPanel value="2">Заявка Тайного Санты</TabPanel>
      </TabContext>
    </div>
  );
};
