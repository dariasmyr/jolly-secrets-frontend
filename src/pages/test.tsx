import { ReactElement } from 'react';
import { Page } from '@components/ui/common/page';

const Test = (): ReactElement => {
  return (
    <Page title={'Test page'}>
      <div
        style={{
          width: '100%',
        }}
      >
        {[...Array.from({ length: 100 }).keys()].map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </Page>
  );
};

export default Test;
