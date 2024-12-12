import User from '@/models/User'
import Client from '@/models/Client'
import InvoiceModel from '@/models/Invoice'
import PropertyModel from '@/models/Property'
// Import other models as needed

export const modelConfigs = {
  users: {
    model: User,
    searchableFields: ['name', 'email', 'status'],
    exportFields: ['name', 'email', 'status', 'age', 'gender', 'address', 'createdAt'],
    importFields: ['name', 'email', 'status', 'age', 'gender', 'address'],
    permissions: ['read', 'create', 'update', 'delete', 'bulk-operation']
  },
  clients: {
    model: Client,
    searchableFields: ['name', 'email', 'phone'],
    exportFields: ['name', 'email', 'phone', 'createdAt'],
    importFields: ['name', 'email', 'phone'],
    permissions: ['read', 'create', 'update', 'delete', 'bulk-operation']
  },
  invoices: {
    model: InvoiceModel,
    searchableFields: ['client.name', 'client.email', 'status', 'dueDate'],
    exportFields: ['client.name', 'client.email', 'status', 'dueDate', 'createdAt'],
    importFields: ['client.name', 'client.email', 'status', 'dueDate'],
    permissions: ['read', 'create', 'update', 'delete', 'bulk-operation']
  },
  properties: {
    model: PropertyModel,
    searchableFields: ['name', 'address', 'status'],
    exportFields: ['name', 'address', 'status', 'createdAt'],
    importFields: ['name', 'address', 'status'],
    permissions: ['read', 'create', 'update', 'delete', 'bulk-operation'],
  }
}

export type ModelConfigKey = keyof typeof modelConfigs 