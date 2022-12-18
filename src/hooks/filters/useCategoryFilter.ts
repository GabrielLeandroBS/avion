import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useCategoryFilter = create(
  persist(
    (set) => ({
      filterContent: [],
      requestContent: [],

      addFilter: (params: string[], search: any[]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set((state: any) => ({
          filterContent: [...state.filterContent, params],
          requestContent: [...state.requestContent, search],
        }));
      },

      updateFilter: (params: string[], getFilter: string[]) => {
        set((state: any) => ({
          filterContent: getFilter,
        }));
      },

      removeFilter: (params: string[], search: string[]) =>
        set((state: any) => ({
          filterContent: state.filterContent.filter(
            (item: string[]) => item !== params
          ),
          requestContent: state.requestContent.filter(
            (item: string[]) => item !== search
          ),
        })),
    }),

    { name: 'Filters' }
  )
);
