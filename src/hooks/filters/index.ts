import create from 'zustand';
import { persist } from 'zustand/middleware';
import { useFilterProps } from '../../types/context/filters';

export const useCategoryFilter = create(
  persist(
    (set) => ({
      filters: [],

      addFilter: (params: any) => {
        set((state: useFilterProps) => ({
          filters: [...state.categoryfilterContent, params],
        }));
      },
    }),

    { name: 'Filters' }
  )
);
