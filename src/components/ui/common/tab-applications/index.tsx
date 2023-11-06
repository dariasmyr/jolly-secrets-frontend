import React, { useState } from 'react';
import { Wrapper } from '@components/ui/common/tab-applications/styled-components';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';

interface Tab {
  label: string;
  value: string;
  component: React.ReactNode;
}

interface ITabApplicationsProperties {
  tabs: Tab[];
  onTabChange: (tabValue: string) => void;
}

export const TabApplications = (
  properties: ITabApplicationsProperties,
): React.ReactElement => {
  const [activeTab, setActiveTab] = useState(properties.tabs[0].value);

  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    newValue: string,
  ): void => {
    setActiveTab(newValue);
    properties.onTabChange(newValue);
  };
  return (
    <Wrapper>
      <TabContext value={activeTab}>
        <TabList
          variant="fullWidth"
          onChange={handleChange}
          aria-label="lab API tabs example"
        >
          {properties.tabs.map((tab) => (
            <Tab
              style={{ fontSize: '13px' }}
              key={tab.value}
              label={tab.label}
              value={tab.value}
            />
          ))}
        </TabList>
        {properties.tabs.map((tab) => (
          <TabPanel key={tab.value} value={tab.value}>
            {tab.component}
          </TabPanel>
        ))}
      </TabContext>
    </Wrapper>
  );
};
