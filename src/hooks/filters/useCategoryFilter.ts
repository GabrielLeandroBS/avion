import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useCategoryFilter = create(
  persist(
    (set) => ({
      filterContent: [],
      requestContent: [],

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      addFilter: (params: any, search: string[]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set((state: any) => ({
          filterContent: [...state.filterContent, params],
          requestContent: [...state.requestContent, search],
        }));
      },

      updateFilter: (params: any, getFilter: any) => {
        set((state: any) => ({
          filterContent: getFilter,
        }));
      },

      removeFilter: (params: any) =>
        set((state: any) => ({
          filterContent: state.filterContent.filter(
            (item: any) => item !== params
          ),
        })),
    }),

    { name: 'Filters' }
  )
);
