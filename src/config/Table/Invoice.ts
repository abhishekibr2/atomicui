import { TableConfig } from '@/types/table.types';

export interface InvoiceData {
  invoiceNumber: string;
  dateIssued: Date;
  dueDate: Date;
  client: {
    name: string;
    email: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'unpaid' | 'paid' | 'overdue';
  createdAt: Date;
}

const commonApi = "table/invoices"

export const invoiceTableConfig: TableConfig<InvoiceData> = {
  id: "invoice-table",
  title: "Invoices",
  description: "Manage your invoices",
  endpoints: {
    getAll: `${commonApi}`,
    create: `${commonApi}`,
    export: `${commonApi}?action=export`,
    import: `${commonApi}?action=import`,
    update: `${commonApi}`,
    delete: `${commonApi}`,
    getOne: `${commonApi}/get`,
    bulkEdit: `${commonApi}?action=bulk-update`,
    bulkDelete: `${commonApi}?action=bulk-delete`
  },
  styles: {
    wrapper: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8",
    title: "text-4xl font-semibold text-gray-900 mb-2",
    description: "text-sm text-gray-500 mb-6",
    table: "min-w-full divide-y divide-gray-300 rounded-lg overflow-hidden shadow-sm",
    header: "bg-gray-50/50 backdrop-blur-sm sticky top-0",
    headerRow: "divide-x divide-gray-200",
    headerCell: "px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white/50",
    body: "divide-y divide-gray-200 bg-white",
    bodyRow: "divide-x divide-gray-200 transition-colors hover:bg-gray-50/50",
    bodyCell: "px-6 py-4 text-sm text-gray-600 font-medium whitespace-nowrap",
    noResults: "px-6 py-12 text-center text-gray-500 bg-white/50 backdrop-blur-sm"
  },
  columns: [
    {
      id: "invoiceNumber",
      header: "Invoice #",
      accessorKey: "invoiceNumber",
      className: "w-[150px] text-gray-900 font-semibold",
      sortable: true,
      filterable: true,
      type: "text"
    },
    {
      id: "client.name",
      header: "Client",
      accessorKey: "client.name",
      className: "w-[300px]",
      type: "text",
    },
    {
      id: "client.email",
      header: "Client Email",
      accessorKey: "client.email",
      className: "w-[300px]",
      type: "email",
    },
    {
      id: "items",
      header: "Items",
      accessorKey: "items",
      className: "min-w-[400px]",
      type: "array",
      arrayType: "items",
      arrayFields: {
        description: {
          type: "text",
          label: "Description",
          placeholder: "Enter item description"
        },
        quantity: {
          type: "number",
          label: "Quantity",
          placeholder: "Enter quantity"
        },
        price: {
          type: "number",
          label: "Price",
          placeholder: "Enter price"
        }
      }
    },
    {
      id: "total",
      header: "Total Amount",
      accessorKey: "total",
      className: "w-[150px] text-right",
      sortable: true,
      type: "number",
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      className: "w-[120px]",
      sortable: true,
      filterable: true,
      type: "select",
      options: [
        { label: 'Paid', value: 'paid' },
        { label: 'Unpaid', value: 'unpaid' },
        { label: 'Overdue', value: 'overdue' }
      ]
    },
    {
      id: "dateIssued",
      header: "Issue Date",
      accessorKey: "dateIssued",
      className: "w-[150px]",
      sortable: true,
      type: "date"
    },
    {
      id: "dueDate",
      header: "Due Date",
      accessorKey: "dueDate",
      className: "w-[150px]",
      sortable: true,
      type: "date"
    }
  ],
  search: {
    enabled: true,
    placeholder: "Search invoices...",
    searchableColumns: ["invoiceNumber", "client.name", "client.email", "status"]
  },
  pagination: {
    enabled: true,
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 50]
  },
  filter: {
    enabled: true,
    operators: [
      { label: 'Equals', value: 'equals' },
      { label: 'Not Equals', value: 'notEquals' },
      { label: 'Contains', value: 'contains' },
      { label: 'Not Contains', value: 'notContains' }
    ]
  },
  columnToggle: {
    enabled: true,
    defaultVisible: true
  },
  export: {
    enabled: true,
    formats: ['csv', 'excel', 'pdf'],
    filename: 'invoices-export'
  },
  import: {
    enabled: true,
    formats: ['csv'],
    template: '/templates/invoices-import-template.csv'
  },
  select: {
    enabled: true,
    type: 'multiple'
  },
  edit: {
    enabled: true,
    allowDelete: true,
    allowUpdate: true,
    confirmDelete: true,
    style: {
      column: "w-[50px]",
      editButton: "hover:text-blue-600",
      deleteButton: "hover:text-red-600"
    },
    messages: {
      deleteConfirm: {
        title: "Delete Invoice",
        description: "Are you sure you want to delete this invoice? This action cannot be undone.",
        confirm: "Delete",
        cancel: "Cancel"
      },
      success: {
        update: "Invoice updated successfully",
        delete: "Invoice deleted successfully"
      },
      error: {
        update: "Failed to update invoice",
        delete: "Failed to delete invoice"
      },
      loading: {
        update: "Updating invoice...",
        delete: "Deleting invoice..."
      }
    }
  },
  bulkEdit: {
    enabled: true,
    allowDelete: true,
    fields: [
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { label: 'Paid', value: 'paid' },
          { label: 'Unpaid', value: 'unpaid' },
          { label: 'Overdue', value: 'overdue' }
        ]
      },
      {
        name: 'dueDate',
        label: 'Due Date',
        type: 'date',
        placeholder: 'Select due date'
      }
    ]
  }
}; 