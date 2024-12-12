import { TableConfig } from '@/types/table.types';

interface UserData {
  // ... existing interface
}
const commonApi = "table/users"

export const userTableConfig: TableConfig<UserData> = {
  id: "user-table",
  title: "Users",
  description: "List of all registered users",
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
      id: "email",
      header: "Email",
      accessorKey: "email",
      className: "min-w-[250px] text-blue-600 hover:text-blue-800",
      sortable: true,
      filterable: true,
      type: "email"
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
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Suspended', value: 'suspended' }
      ]
    },
    {
      id: "age",
      header: "Age",
      accessorKey: "age",
      className: "w-[100px]",
      sortable: true,
      type: "number"
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
      id: "number",
      header: "Phone",
      accessorKey: "number",
      className: "w-[150px]",
      sortable: true,
      type: "phone"
    },
    {
      id: "address",
      header: "Address",
      accessorKey: "address",
      className: "min-w-[300px]",
      sortable: true,
      type: "address"
    },
    {
      id: "gender",
      header: "Gender",
      accessorKey: "gender",
      className: "w-[100px]",
      sortable: true,
      filterable: true,
      type: "select",
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' }
      ]
    }
  ],
  search: {
    enabled: true,
    placeholder: "Search users...",
    searchableColumns: ["name", "email", "status"]
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
    filename: 'users-export'
  },
  import: {
    enabled: true,
    formats: ['csv'],
    template: '/templates/users-import-template.csv'
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
        description: "This action cannot be undone. This will permanently delete the user and remove their data from our servers.",
        confirm: "Delete",
        cancel: "Cancel"
      },
      success: {
        update: "User has been updated successfully",
        delete: "User has been deleted successfully"
      },
      error: {
        update: "Failed to update user",
        delete: "Failed to delete user"
      },
      loading: {
        update: "Updating user...",
        delete: "Deleting user..."
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
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
          { label: 'Pending', value: 'pending' }
        ]
      },
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'User', value: 'user' },
          { label: 'Manager', value: 'manager' }
        ]
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email'
      }
    ]
  }
}; 