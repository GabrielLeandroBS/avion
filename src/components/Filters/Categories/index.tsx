import React from 'react';
import { Popover, Whisper, Button as ButtonPopover } from 'rsuite';

const FilterCategories: React.FC = () => {
  return (
    <section className="c-categories">
      <Whisper
        placement="bottomEnd"
        trigger="click"
        speaker={<Popover arrow={false}>List filters with Categories Product</Popover>}
      >
        <ButtonPopover>Categories</ButtonPopover>
      </Whisper>
    </section>
  );
};

export default FilterCategories;
