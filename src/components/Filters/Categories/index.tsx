import { createSearchParams, useNavigate } from 'react-router-dom';
import { Popover, Whisper, Button as ButtonPopover } from 'rsuite';
import React, { useEffect, useState } from 'react';

import { getCategories } from '../../../services/categories.service';
import {
  FilterCategoriesStringProps,
  FilterCategoriesProps,
} from '../../../types/filters/categories';
import { useCategoryFilter } from '../../../hooks/filters/useCategoryFilter';
import { useFilterProps } from '../../../types/context/filters/categories';

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

  const handleFormatRequestParams = () => {
    const formatRequestParamsContent: FilterCategoriesStringProps =
      requestContent.join('').replaceAll(/\?/g, '&');
    const formatRequestParamsSearch: FilterCategoriesStringProps =
      formatRequestParamsContent.replaceAll(/=/g, '');
    const getRequestParams = decodeURIComponent(formatRequestParamsSearch);
    console.log(getRequestParams);
  };

  const handleAddingFilter = (category: FilterCategoriesStringProps) => {
    const findFilter = getFilter.includes(category);
    goToNavigate({
      pathname: '/products',
      search: `${createSearchParams({
        filters: `[categories][category][$in]=${category}`,
      })}`,
    });
    const getUrlRequest = decodeURI(window.location.search);
    findFilter ? updateFilter(getFilter) : addFilter(category, getUrlRequest);
  };

  const handleRemoveFilter = (category: FilterCategoriesStringProps) => {
    const getUrlRequest = decodeURI(window.location.search);
    removeFilter(category, getUrlRequest);
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

              <button type="button" onClick={() => handleFormatRequestParams()}>
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
