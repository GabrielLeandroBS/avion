import create from 'zustand';
import { persist } from 'zustand/middleware';
import { FilterCategoriesProps } from '../../types/context/filters/categories';
import { useFilterProps } from '../../types/context/filters';

export const useCategoryFilter = create(
  persist(
    (set) => ({
      listOfCategoriesDeterminedByTheAdministrativePanel: [],
      userSelectedCheckboxList: [],

      addCategoryFilter: (
        params: FilterCategoriesProps,
        search: FilterCategoriesProps
      ) => {
        set((state: useFilterProps) => ({
          listOfCategoriesDeterminedByTheAdministrativePanel: [
            ...state.listOfCategoriesDeterminedByTheAdministrativePanel,
            params,
          ],
          userSelectedCheckboxList: [...state.userSelectedCheckboxList, search],
        }));
      },

      updateCategoryFilter: (getFilterResult: FilterCategoriesProps) => {
        set(() => ({
          listOfCategoriesDeterminedByTheAdministrativePanel: getFilterResult,
        }));
      },

      removeCategoryFilter: (
        params: FilterCategoriesProps,
        search: FilterCategoriesProps
      ) =>
        set((state: useFilterProps) => ({
          listOfCategoriesDeterminedByTheAdministrativePanel:
            state.listOfCategoriesDeterminedByTheAdministrativePanel.filter(
              (item: FilterCategoriesProps) => item !== params
            ),
          userSelectedCheckboxList: state.userSelectedCheckboxList.filter(
            (item: FilterCategoriesProps) => item !== search
          ),
        })),
    }),

    { name: 'Filters Category' }
  )
);
