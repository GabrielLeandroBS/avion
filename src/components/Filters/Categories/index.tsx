import { createSearchParams, useNavigate } from 'react-router-dom';
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
    (state: useFilterProps) => state.categoryfilterContent
  );
  const requestContent = useCategoryFilter(
    (state: useFilterProps) => state.categoryRequestContent
  );
  const addFilter = useCategoryFilter(
    (state: useFilterProps) => state.addCategoryFilter
  );
  const updateFilter = useCategoryFilter(
    (state: useFilterProps) => state.updateCategoryFilter
  );
  const removeFilter = useCategoryFilter(
    (state: useFilterProps) => state.removeCategoryFilter
  );
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

  const handleFilter = () => {
    const formatRequestParamsContent: string = requestContent
      .join('')
      .replaceAll(/\?/g, '&');
    const formatRequestParamsSearch: string =
      formatRequestParamsContent.replaceAll(/=/g, '');
    const getRequestParams = decodeURIComponent(formatRequestParamsSearch);
    console.log(getRequestParams);
  };

  const handleAddingFilter = (category: string) => {
    const findFilter = getFilter.includes(category);
    goToNavigate({
      pathname: '/products',
      search: `${createSearchParams({
        filters: `[categories][category][$in]=${category}`,
      })}`,
    });
    const getUrlRequest = decodeURI(window.location.search);
    findFilter ? updateFilter(category) : addFilter(category, getUrlRequest);
  };

  const handleRemoveFilter = (category: string) => {
    const getUrlRequest = decodeURI(window.location.search);
    removeFilter(category, getUrlRequest);
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

              <button type="button" onClick={() => handleFilter()}>
                Filter
              </button>
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
