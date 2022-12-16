import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useFilter = create(
  persist(
    (set) => ({
      filterContent: [],

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      addFilter: (params: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set((state: any) => ({
          filterContent: [...state.filterContent, params],
        }));
      },

      updateFilter: (params: any, getFilter: any) => {
        set((state: any) => ({
          filterContent: getFilter,
        }));
      },

      removeFilter: (params: any) =>
        set((state: any) => ({
          filterContent: state.filterContent.filter((item: any) => item !== params),
        })),
    }),

    { name: 'Filters' }
  )
);
