import { TableConfig } from '@/types/table.types';

interface ClientData {
  _id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export const clientTableConfig: TableConfig<ClientData> = {
  id: "client-table",
  title: "Clients",
  description: "List of all registered clients",
  endpoints: {
    getAll: "table/clients",
    create: "table/clients",
    export: 'table/clients?action=export',
    import: 'table/clients?action=import',
    update: "table/clients",
    delete: "table/clients",
    getOne: "table/clients/get"
  },
  styles: {
    wrapper: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8",
    title: "text-4xl font-semibold text-gray-900 mb-2",
    description: "text-sm text-gray-500 mb-6",
    table: "min-w-full divide-y divide-gray-300 rounded-lg overflow-hidden shadow-sm ",
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
      id: "name",
      header: "Name",
      accessorKey: "name",
      className: "w-[200px] text-gray-900 font-semibold",
      sortable: true,
      filterable: true,
      defaultVisible: true,
      type: "text"
    },
    {
      id: "companyName",
      header: "Company",
      accessorKey: "companyName",
      className: "w-[200px]",
      sortable: true,
      filterable: true,
      defaultVisible: true,
      type: "text"
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
      className: "min-w-[250px] text-blue-600 hover:text-blue-800",
      sortable: true,
      filterable: true,
      type: "email"
    },
    {
      id: "phone",
      header: "Phone",
      accessorKey: "phone",
      className: "w-[150px]",
      sortable: true,
      type: "phone"
    },
    {
      id: "createdAt",
      header: "Created At",
      accessorKey: "createdAt",
      className: "w-[180px] text-gray-500",
      sortable: true,
      type: "date"
    },
    {
      id: "updatedAt",
      header: "Updated At",
      accessorKey: "updatedAt",
      className: "w-[180px] text-gray-500",
      sortable: true,
      type: "date"
    }
  ],
  search: {
    enabled: true,
    placeholder: "Search clients...",
    searchableColumns: ["name", "companyName", "email"]
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
    filename: 'clients-export'
  },
  import: {
    enabled: true,
    formats: ['csv'],
    template: '/templates/clients-import-template.csv'
  },
  select: {
    enabled: true,
    type: 'multiple',
    onSelect: (selectedRows) => {
      console.log('Selected rows:', selectedRows)
    }
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
        title: "Are you sure?",
        description: "This action cannot be undone. This will permanently delete the client and remove their data from our servers.",
        confirm: "Delete",
        cancel: "Cancel"
      },
      success: {
        update: "Client has been updated successfully",
        delete: "Client has been deleted successfully"
      },
      error: {
        update: "Failed to update client",
        delete: "Failed to delete client"
      },
      loading: {
        update: "Updating client...",
        delete: "Deleting client..."
      }
    }
  }
}; 