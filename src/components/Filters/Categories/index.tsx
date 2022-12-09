import React from 'react';
import { Popover, Whisper, Button as ButtonPopover } from 'rsuite';

const FilterCategories: React.FC = () => {
  return (
    <section className="c-categories">
      <Whisper
        placement="bottomStart"
        trigger="click"
        speaker={<Popover arrow={false}>Categories Product</Popover>}
      >
        <ButtonPopover>Categories</ButtonPopover>
      </Whisper>
    </section>
  );
};

export default FilterCategories;
