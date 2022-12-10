import React, { useEffect, useState } from 'react';
import { Popover, Whisper, Button as ButtonPopover } from 'rsuite';
import { getCategories } from '../../../services/categories.service';
import { FilterCategoriesProps } from '../../../types/filters/categories';

const FilterCategories: React.FC = () => {
  const [categories, setCategories] = useState<FilterCategoriesProps>([
    {
      attributes: {
        categories: '',
      },
    },
  ]);

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

  // console.log(categories?.map(item => item));

  categories.map((item) => console.log(item.attributes));

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
