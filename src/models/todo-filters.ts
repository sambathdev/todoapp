export interface TodoFilters {
  isCompleted: boolean | null;
  search: string;
  sortBy: SortBy;
  sortType: sortType;
}

export type SortBy = 'date' | 'alphabet';
export type sortType = 'asc' | 'desc';
