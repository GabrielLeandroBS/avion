import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useCategoryFilter = create(
  persist(
    (set) => ({
      categoryfilterContent: [],
      categoryRequestContent: [],

      addCategoryFilter: (params: string[], search: string[]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set((state: any) => ({
          categoryfilterContent: [...state.categoryfilterContent, params],
          categoryRequestContent: [...state.categoryRequestContent, search],
        }));
      },

      updateCategoryFilter: (getFilter: string[]) => {
        set((state: any) => ({
          categoryfilterContent: getFilter,
        }));
      },

      removeCategoryFilter: (params: string[], search: string[]) =>
        set((state: any) => ({
          categoryfilterContent: state.categoryfilterContent.filter(
            (item: string[]) => item !== params
          ),
          categoryRequestContent: state.categoryRequestContent.filter(
            (item: string[]) => item !== search
          ),
        })),
    }),

    { name: 'Filters' }
  )
);
