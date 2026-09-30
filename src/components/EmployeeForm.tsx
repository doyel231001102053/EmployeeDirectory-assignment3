import { useState, type FormEvent, type HTMLAttributes } from 'react'
import {
  DEPARTMENTS,
  GENDERS,
  type Employee,
  type EmployeeFormValues,
} from '../types'

interface EmployeeFormProps {
  mode: 'add' | 'edit'
  initial?: Employee
  existingIds: string[]
  onClose: () => void
  onSave: (values: EmployeeFormValues) => void
}

const emptyForm: EmployeeFormValues = {
  name: '',
  employeeId: '',
  department: 'Administration',
  gender: 'Male',
  phone: '',
  localAddress: '',
  permanentAddress: '',
}

type FormErrors = Partial<Record<keyof EmployeeFormValues, string>>

function validate(
  values: EmployeeFormValues,
  existingIds: string[],
  originalId?: string,
): FormErrors {
  const errors: FormErrors = {}
  const trimmedId = values.employeeId.trim()
  const digits = values.phone.replace(/\D/g, '')

  if (!values.name.trim()) errors.name = 'Name is required.'
  if (!trimmedId) errors.employeeId = 'Employee ID is required.'
  if (!values.department) errors.department = 'Department is required.'
  if (!values.gender) errors.gender = 'Gender is required.'
  if (!values.phone.trim()) errors.phone = 'Phone is required.'
  else if (digits.length !== 10)
    errors.phone = 'Phone must be exactly 10 digits.'
  if (!values.localAddress.trim())
    errors.localAddress = 'Local address is required.'
  if (!values.permanentAddress.trim())
    errors.permanentAddress = 'Permanent address is required.'

  if (trimmedId) {
    const taken = existingIds.some(
      (id) =>
        id.toLowerCase() === trimmedId.toLowerCase() &&
        id.toLowerCase() !== originalId?.toLowerCase(),
    )
    if (taken) errors.employeeId = 'Employee ID must be unique.'
  }

  return errors
}

export function EmployeeForm({
  mode,
  initial,
  existingIds,
  onClose,
  onSave,
}: EmployeeFormProps) {
  const [values, setValues] = useState<EmployeeFormValues>(initial ?? emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})

  function update<K extends keyof EmployeeFormValues>(
    key: K,
    value: EmployeeFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const nextErrors = validate(values, existingIds, initial?.employeeId)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onSave({
      ...values,
      name: values.name.trim(),
      employeeId: values.employeeId.trim(),
      phone: values.phone.replace(/\D/g, ''),
      localAddress: values.localAddress.trim(),
      permanentAddress: values.permanentAddress.trim(),
    })
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#14261b]/40 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="employee-form-title"
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[20px] border border-line bg-white p-6 shadow-[0_16px_40px_rgba(20,38,27,0.16)] animate-[modalIn_220ms_ease-out] motion-reduce:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="employee-form-title" className="text-2xl font-bold text-ink">
          {mode === 'add' ? 'Add Employee' : 'Edit Employee'}
        </h2>
        <p className="mt-1 text-sm text-muted">
          All fields are required. Employee ID must be unique.
        </p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <Field
            label="Name"
            error={errors.name}
            value={values.name}
            onChange={(v) => update('name', v)}
          />
          <Field
            label="Employee ID"
            error={errors.employeeId}
            value={values.employeeId}
            onChange={(v) => update('employeeId', v)}
            placeholder="FRM-1009"
          />
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Department</span>
            <select
              value={values.department}
              onChange={(e) =>
                update('department', e.target.value as EmployeeFormValues['department'])
              }
              className="h-11 rounded-xl border border-line bg-cream px-3 outline-none focus:border-farm"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <span className="text-sm text-red-600">{errors.department}</span>
            )}
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Gender</span>
            <select
              value={values.gender}
              onChange={(e) =>
                update('gender', e.target.value as EmployeeFormValues['gender'])
              }
              className="h-11 rounded-xl border border-line bg-cream px-3 outline-none focus:border-farm"
            >
              {GENDERS.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            {errors.gender && (
              <span className="text-sm text-red-600">{errors.gender}</span>
            )}
          </label>
          <Field
            label="Phone"
            error={errors.phone}
            value={values.phone}
            onChange={(v) => update('phone', v)}
            placeholder="10-digit number"
            inputMode="numeric"
          />
          <Field
            label="Local address"
            error={errors.localAddress}
            value={values.localAddress}
            onChange={(v) => update('localAddress', v)}
          />
          <Field
            label="Permanent address"
            error={errors.permanentAddress}
            value={values.permanentAddress}
            onChange={(v) => update('permanentAddress', v)}
          />

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted transition-transform duration-150 hover:text-ink active:scale-95 motion-reduce:active:scale-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-farm px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(27,138,69,0.25)] transition-transform duration-150 hover:bg-farm-hover active:scale-95 motion-reduce:active:scale-100"
            >
              {mode === 'add' ? 'Add Employee' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  inputMode,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode']
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="h-11 rounded-xl border border-line bg-cream px-3 outline-none focus:border-farm"
      />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </label>
  )
}
