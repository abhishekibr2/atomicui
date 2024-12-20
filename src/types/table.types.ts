import { FormField } from "@/types/form.types";

export interface TableStyles {
  table?: string;
  header?: string;
  headerRow?: string;
  headerCell?: string;
  body?: string;
  bodyRow?: string;
  bodyCell?: string;
  noResults?: string;
  wrapper?: string;
  title?: string;
  description?: string;
}

export type ColumnType = 'text' | 'number' | 'date' | 'select' | 'email' | 'address' | 'phone' | 'gender' | 'array';

export interface TableColumn {
  id: string;
  header: string;
  accessorKey: string;
  className?: string;
  sortable?: boolean;
  filterable?: boolean;
  defaultVisible?: boolean;
  type?: string;
  options?: Array<{ label: string; value: string }>;
  arrayType?: string;
  arrayFields?: {
    [key: string]: {
      type: string;
      label: string;
      placeholder?: string;
    };
  };
}

export interface TableEndpoints {
  getAll: string;
  create?: string;
  update?: string;
  delete?: string;
  bulkEdit?: string;
  getOne?: string;
  export?: string;
  import?: string;
  bulkDelete?: string;
}

export interface SortingState {
  column: string | null;
  direction: 'asc' | 'desc' | null;
}

export interface SearchConfig {
  enabled: boolean;
  placeholder?: string;
  searchableColumns: string[];
}

export interface PaginationConfig {
  enabled: boolean;
  pageSize: number;
  pageSizeOptions: number[];
}

export interface FilterOperator {
  label: string;
  value: 'equals' | 'notEquals' | 'contains' | 'notContains';
}

export interface FilterValue {
  column: string;
  operator: FilterOperator['value'];
  value: string;
}

export interface FilterConfig {
  enabled: boolean;
  operators: FilterOperator[];
}

export interface ColumnToggleConfig {
  enabled: boolean;
  defaultVisible?: boolean;
}

export interface ExportConfig {
  enabled: boolean;
  formats: Array<'csv' | 'excel' | 'pdf'>;
  filename?: string;
}

export interface ImportConfig {
  enabled: boolean;
  formats: Array<'csv'>;
  template?: string;
}

export interface SelectConfig {
  enabled: boolean;
  type: 'single' | 'multiple';
  onSelect?: (selectedRows: any[]) => void;
}

export interface EditConfig {
  enabled: boolean;
  allowDelete?: boolean;
  allowUpdate?: boolean;
  confirmDelete?: boolean;
  style?: {
    column?: string;
    editButton?: string;
    deleteButton?: string;
  };
  messages?: {
    deleteConfirm?: {
      title?: string;
      description?: string;
      confirm?: string;
      cancel?: string;
    };
    success?: {
      update?: string;
      delete?: string;
    };
    error?: {
      update?: string;
      delete?: string;
    };
    loading?: {
      update?: string;
      delete?: string;
    };
  };
}

export interface BulkEditConfig {
  enabled: boolean;
  fields?: FormField[];
  allowDelete?: boolean;
}

export interface TableConfig<T = any> {
  id: string;
  title?: string;
  description?: string;
  columns: TableColumn[];
  endpoints: TableEndpoints;
  styles?: TableStyles;
  search?: SearchConfig;
  pagination?: PaginationConfig;
  filter?: FilterConfig;
  columnToggle?: ColumnToggleConfig;
  export?: ExportConfig;
  import?: ImportConfig;
  select?: SelectConfig;
  edit?: EditConfig;
  bulkEdit?: BulkEditConfig;
}
    
export interface TableProps {
  config: TableConfig;
}

export interface ApiResponse<T> {
  data: {
    items: T[];
    pagination: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      pageSize: number;
    }
  };
  status: number;
  message?: string;
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
} 