import React, { useEffect, useState } from 'react';
import { Popover, Whisper, Button as ButtonPopover } from 'rsuite';
import { getCategories } from '../../../services/categories.service';
import { FilterCategoriesProps } from '../../../types/filters/categories';

import { useFilter } from '../../../hooks/useFilter';
import { useFilterProps } from '../../../types/context';

const FilterCategories: React.FC = () => {
  const [categories, setCategories] = useState<FilterCategoriesProps>([
    {
      attributes: {
        category: '',
      },
    },
  ]);

  const getFilter = useFilter((state: any) => state.filterContent);
  const addFilter = useFilter((state: useFilterProps) => state.addFilter);
  const updateFilter = useFilter((state: useFilterProps) => state.updateFilter);
  const removeFilter = useFilter((state: useFilterProps) => state.removeFilter);
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

  const handleAddingFilter = (category: string) => {
    const findFilter = getFilter.includes(category);
    findFilter ? console.log('Não existe') : addFilter(category);
  };

  const handleRemoveFilter = (category: string) => {
    removeFilter(category);
    console.log(`Remover ${category}`);
  };

  console.log(getFilter);

  return (
    <section className="c-categories">
      <Whisper
        placement="bottomStart"
        trigger="click"
        speaker={
          <Popover arrow={true}>
            <form>
              {categories.map(({ attributes }) => (
                <label
                  key={attributes.category}
                  className="c-categories__label"
                  htmlFor={attributes.category}
                >
                  <input
                    type="checkbox"
                    id={attributes.category}
                    value={attributes.category}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleAddingFilter(attributes.category);
                      } else {
                        handleRemoveFilter(attributes.category);
                      }
                    }}
                  />
                  {attributes.category}
                </label>
              ))}
            </form>
          </Popover>
        }
      >
        <ButtonPopover>Categories</ButtonPopover>
      </Whisper>
    </section>
  );
};

export default FilterCategories;
