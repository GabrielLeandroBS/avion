import React from 'react';
import { Popover, Whisper, Button as ButtonPopover } from 'rsuite';

const FilterCategories: React.FC = () => {
  return (
    <section className="c-categories">
      <Whisper
        placement="bottomEnd"
        trigger="click"
        speaker={<Popover arrow={false}>Remove Item</Popover>}
      >
        <ButtonPopover>Categories</ButtonPopover>
      </Whisper>
    </section>
  );
};

export default FilterCategories;
