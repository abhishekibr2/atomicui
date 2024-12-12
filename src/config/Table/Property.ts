import { TableConfig } from '@/types/table.types';

interface PropertyData {
  propertyId: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  owner: {
    name: string;
    contact: {
      email: string;
      phone?: string;
    };
  };
  type: 'residential' | 'commercial' | 'industrial';
  size: number;
  price: number;
  status: 'available' | 'occupied' | 'under maintenance';
  createdAt: Date;
  updatedAt: Date;
}

const commonApi = "table/properties"

export const propertyTableConfig: TableConfig<PropertyData> = {
  id: "property-table",
  title: "Properties",
  description: "Manage your property listings",
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
  columns: [
    {
      id: "propertyId",
      header: "Property ID",
      accessorKey: "propertyId",
      className: "w-[150px] text-gray-900 font-semibold",
      sortable: true,
      filterable: true,
      type: "text"
    },
    {
      id: "name",
      header: "Property Name",
      accessorKey: "name",
      className: "w-[200px]",
      sortable: true,
      filterable: true,
      type: "text"
    },
    {
      id: "owner.name",
      header: "Owner Name",
      accessorKey: "owner.name",
      className: "w-[200px]",
      sortable: true,
      filterable: true,
      type: "text"
    },
    {
      id: "owner.contact.email",
      header: "Owner Email",
      accessorKey: "owner.contact.email",
      className: "w-[250px]",
      type: "email"
    },
    {
      id: "owner.contact.phone",
      header: "Phone",
      accessorKey: "owner.contact.phone",
      className: "w-[150px]",
      type: "phone"
    },
    {
      id: "type",
      header: "Type",
      accessorKey: "type",
      className: "w-[150px]",
      sortable: true,
      filterable: true,
      type: "select",
      options: [
        { label: 'Residential', value: 'residential' },
        { label: 'Commercial', value: 'commercial' },
        { label: 'Industrial', value: 'industrial' }
      ]
    },
    {
      id: "size",
      header: "Size (sq ft)",
      accessorKey: "size",
      className: "w-[150px] text-right",
      sortable: true,
      type: "number"
    },
    {
      id: "price",
      header: "Price",
      accessorKey: "price",
      className: "w-[150px] text-right",
      sortable: true,
      type: "number"
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      className: "w-[150px]",
      sortable: true,
      filterable: true,
      type: "select",
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Occupied', value: 'occupied' },
        { label: 'Under Maintenance', value: 'under maintenance' }
      ]
    },
    {
      id: "address",
      header: "Address",
      accessorKey: "address",
      className: "min-w-[300px]",
      type: "address"
    }
  ],
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
  search: {
    enabled: true,
    placeholder: "Search properties...",
    searchableColumns: ["propertyId", "name", "owner.name", "type", "status"]
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
    filename: 'properties-export'
  },
  import: {
    enabled: true,
    formats: ['csv']
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
          { label: 'Available', value: 'available' },
          { label: 'Occupied', value: 'occupied' },
          { label: 'Under Maintenance', value: 'under maintenance' }
        ]
      },
      {
        name: 'type',
        label: 'Type',
        type: 'select',
        options: [
          { label: 'Residential', value: 'residential' },
          { label: 'Commercial', value: 'commercial' },
          { label: 'Industrial', value: 'industrial' }
        ]
      }
    ]
  }
}; 