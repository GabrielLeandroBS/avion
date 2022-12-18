import create from 'zustand';
import { persist } from 'zustand/middleware';
import {
  FilterCategoriesProps,
  useFilterProps,
} from '../../types/context/filters/categories';

export const useCategoryFilter = create(
  persist(
    (set) => ({
      categoryfilterContent: [],
      categoryRequestContent: [],

      addCategoryFilter: (
        params: FilterCategoriesProps,
        search: FilterCategoriesProps
      ) => {
        set((state: useFilterProps) => ({
          categoryfilterContent: [...state.categoryfilterContent, params],
          categoryRequestContent: [...state.categoryRequestContent, search],
        }));
      },

      updateCategoryFilter: (getFilter: FilterCategoriesProps) => {
        set(() => ({
          categoryfilterContent: getFilter,
        }));
      },

      removeCategoryFilter: (
        params: FilterCategoriesProps,
        search: FilterCategoriesProps
      ) =>
        set((state: useFilterProps) => ({
          categoryfilterContent: state.categoryfilterContent.filter(
            (item: FilterCategoriesProps) => item !== params
          ),
          categoryRequestContent: state.categoryRequestContent.filter(
            (item: FilterCategoriesProps) => item !== search
          ),
        })),
    }),

    { name: 'Filters' }
  )
);
