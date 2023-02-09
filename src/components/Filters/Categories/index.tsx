import { createSearchParams, useNavigate } from 'react-router-dom';
import { Popover, Whisper, Button as ButtonPopover } from 'rsuite';
import React, { useEffect, useState } from 'react';

import { getCategories } from '../../../services/categories.service';
import {
  FilteringParametersForCategoryProps,
  FilterCategoriesProps,
} from '../../../types/filters/categories';
import { useCategoryFilter } from '../../../hooks/filters/useCategoryFilter';
import { useFilterProps } from '../../../types/context/filters';
import ButtonFilter from '../../Button/Filter';
import { getProductsFilteredByCategories } from '../../../services/filter.service';

const FilterCategories: React.FC = () => {
  const [categories, setCategories] = useState<FilterCategoriesProps>([
    {
      attributes: {
        category: '',
      },
    },
  ]);
  const [searchParams, setSearchParams] = useState('');

  const getFilterResult = useCategoryFilter(
    (state: useFilterProps) =>
      state.listOfCategoriesDeterminedByTheAdministrativePanel
  );
  const getStateWithSelectedCheckbox = useCategoryFilter(
    (state: useFilterProps) => state.userSelectedCheckboxList
  );
  const AddFilterWithGlobalStateCategory = useCategoryFilter(
    (state: useFilterProps) => state.addCategoryFilter
  );
  const updateFilterWithGlobalStateCategory = useCategoryFilter(
    (state: useFilterProps) => state.updateCategoryFilter
  );
  const removeFilterWithGlobalStateCategory = useCategoryFilter(
    (state: useFilterProps) => state.removeCategoryFilter
  );
  const goToNavigate = useNavigate();

  const getFilterCategories = async () => {
    const { data } = await getCategories();
    setCategories(data);
  };

  const handleAddingFilter = (
    category: FilteringParametersForCategoryProps
  ) => {
    const validateIfItemAlreadyExists = getFilterResult.includes(category);

    goToNavigate({
      pathname: '/products',
      search: `${createSearchParams({
        filters: `[categories][category][$in]=${category}`,
      })}`,
    });

    const setAllUrlWithSearchParams = decodeURIComponent(window.location.search);
    setSearchParams(setAllUrlWithSearchParams);

    validateIfItemAlreadyExists
      ? updateFilterWithGlobalStateCategory(getFilterResult)
      : AddFilterWithGlobalStateCategory(category, setAllUrlWithSearchParams);
  };

  const handleRemoveFilter = (
    category: FilteringParametersForCategoryProps
  ) => {
    const getSearchParametersFromUrl = decodeURIComponent(
      window.location.search
    );

    removeFilterWithGlobalStateCategory(category, getSearchParametersFromUrl);
  };

  const handleRequestParams = ( )=> {
    const formattingQueryCharactersForConcatenation: FilteringParametersForCategoryProps =
      getStateWithSelectedCheckbox.join('').replaceAll(/\?/g, '&');

    const formattingQueryCharactersSearch: FilteringParametersForCategoryProps =
      formattingQueryCharactersForConcatenation.replaceAll(/=/g, '');

    const getCompleteFilteringParameters = decodeURIComponent(
      formattingQueryCharactersSearch
    );
    // After add in the filter global and insert new request for categories /******* */
    console.log(getCompleteFilteringParameters);
  }

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
              <ButtonFilter filterButtonProps={handleRequestParams} />
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
