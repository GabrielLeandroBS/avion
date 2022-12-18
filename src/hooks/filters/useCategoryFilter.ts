import create from 'zustand';
import { persist } from 'zustand/middleware';
import {
  FilterCategoriesStringsProps,
  useFilterProps,
} from '../../types/context/filters/categories';

export const useCategoryFilter = create(
  persist(
    (set) => ({
      categoryfilterContent: [],
      categoryRequestContent: [],

      addCategoryFilter: (
        params: FilterCategoriesStringsProps,
        search: FilterCategoriesStringsProps
      ) => {
        set((state: useFilterProps) => ({
          categoryfilterContent: [...state.categoryfilterContent, params],
          categoryRequestContent: [...state.categoryRequestContent, search],
        }));
      },

      updateCategoryFilter: (getFilter: FilterCategoriesStringsProps) => {
        set(() => ({
          categoryfilterContent: getFilter,
        }));
      },

      removeCategoryFilter: (
        params: FilterCategoriesStringsProps,
        search: FilterCategoriesStringsProps
      ) =>
        set((state: useFilterProps) => ({
          categoryfilterContent: state.categoryfilterContent.filter(
            (item: FilterCategoriesStringsProps) => item !== params
          ),
          categoryRequestContent: state.categoryRequestContent.filter(
            (item: FilterCategoriesStringsProps) => item !== search
          ),
        })),
    }),

    { name: 'Filters' }
  )
);
