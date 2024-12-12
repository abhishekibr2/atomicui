export type FieldType = 'text' | 'select' | 'number' | 'date' | 'email'

export interface FormField {
    name: string
    label: string
    type: FieldType
    placeholder?: string
    options?: Array<{
        label: string
        value: string | number
    }>
} 