import React, { useEffect, useState } from 'react';
import { Popover, Whisper, Button as ButtonPopover } from 'rsuite';
import { getCategories } from '../../../services/categories.service';

const FilterCategories: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const getFilterCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch {
      alert('Não deu certo!');
    }
  };

  useEffect(() => {
    (async () => {
      await getFilterCategories();
    })();
  }, []);

  console.log(categories);

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
