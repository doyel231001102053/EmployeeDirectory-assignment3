export const DEPARTMENTS = [
  'Administration',
  'Crop Production',
  'Dairy',
  'Equipment & Maintenance',
  'Irrigation',
] as const

export type Department = (typeof DEPARTMENTS)[number]

export const GENDERS = ['Male', 'Female'] as const

export type Gender = (typeof GENDERS)[number]

export interface Employee {
  name: string
  employeeId: string
  department: Department
  gender: Gender
  phone: string
  localAddress: string
  permanentAddress: string
}

export type EmployeeFormValues = Employee

export type ToastMessage = {
  id: number
  text: string
} | null
