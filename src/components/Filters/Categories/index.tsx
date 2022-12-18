import { useLocation, createSearchParams, useNavigate } from 'react-router-dom';
import { Popover, Whisper, Button as ButtonPopover } from 'rsuite';
import React, { useEffect, useState } from 'react';

import { getCategories } from '../../../services/categories.service';
import { FilterCategoriesProps } from '../../../types/filters/categories';
import { useCategoryFilter } from '../../../hooks/filters/useCategoryFilter';
import { useFilterProps } from '../../../types/context';

const FilterCategories: React.FC = () => {
  const [categories, setCategories] = useState<FilterCategoriesProps>([
    {
      attributes: {
        category: '',
      },
    },
  ]);
  const getFilter = useCategoryFilter(
    (state: useFilterProps) => state.filterContent
  );
  const requestContent = useCategoryFilter(
    (state: useFilterProps) => state.requestContent
  );
  const addFilter = useCategoryFilter(
    (state: useFilterProps) => state.addFilter
  );
  const updateFilter = useCategoryFilter(
    (state: useFilterProps) => state.updateFilter
  );
  const removeFilter = useCategoryFilter(
    (state: useFilterProps) => state.removeFilter
  );
  const getParamsFromUrl = useLocation();
  const goToNavigate = useNavigate();

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

    goToNavigate({
      pathname: '/products',
      search: `?${createSearchParams({
        filters: `[categories][category][$in]=${category}`,
      })}`,
    });

    const getUrlRequest = decodeURIComponent(getParamsFromUrl.search);


    findFilter ? updateFilter(category) : addFilter(category, getUrlRequest);
    console.log(requestContent);
  };

  const handleRemoveFilter = (category: string) => {
    removeFilter(category);
    console.log(`Remover ${category}`);
  };

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
                      e.target.checked
                        ? handleAddingFilter(attributes.category)
                        : handleRemoveFilter(attributes.category);
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
