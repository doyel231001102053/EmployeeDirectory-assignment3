import { useMemo, useState } from 'react'
import { ConfirmDialog } from './components/ConfirmDialog'
import { EmployeeCard } from './components/EmployeeCard'
import { EmployeeForm } from './components/EmployeeForm'
import { SearchFilterBar } from './components/SearchFilterBar'
import { StatsBar } from './components/StatsBar'
import { Toast } from './components/Toast'
import { sampleEmployees } from './data/sampleEmployees'
import type { Employee, ToastMessage } from './types'

type FormState =
  | { open: false }
  | { open: true; mode: 'add' }
  | { open: true; mode: 'edit'; employee: Employee }

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>(sampleEmployees)
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')
  const [form, setForm] = useState<FormState>({ open: false })
  const [pendingDelete, setPendingDelete] = useState<Employee | null>(null)
  const [toast, setToast] = useState<ToastMessage>(null)

  function showToast(text: string) {
    const id = Date.now()
    setToast({ id, text })
    window.setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current))
    }, 2400)
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return employees.filter((employee) => {
      const matchesSearch =
        q.length === 0 ||
        employee.name.toLowerCase().includes(q) ||
        employee.employeeId.toLowerCase().includes(q)
      const matchesDept = department === '' || employee.department === department
      return matchesSearch && matchesDept
    })
  }, [employees, search, department])

  return (
    <div className="min-h-svh bg-cream px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Farm Employee Directory
            </h1>
            <p className="mt-2 text-base text-muted">
              Staff records across every farm department.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setForm({ open: true, mode: 'add' })}
            className="shrink-0 rounded-xl bg-farm px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(27,138,69,0.28)] transition-transform duration-150 hover:bg-farm-hover active:scale-95 motion-reduce:active:scale-100"
          >
            Add Employee
          </button>
        </header>

        <StatsBar employees={employees} />
        <SearchFilterBar
          search={search}
          department={department}
          onSearchChange={setSearch}
          onDepartmentChange={setDepartment}
        />

        <p className="text-sm font-medium text-muted">
          Showing {filtered.length} of {employees.length} employees
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-[18px] border border-dashed border-line bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold text-ink">No employees found</p>
            <p className="mt-1 text-sm text-muted">
              Try a different search or department filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filtered.map((employee) => (
              <EmployeeCard
                key={employee.employeeId}
                employee={employee}
                onEdit={(next) =>
                  setForm({ open: true, mode: 'edit', employee: next })
                }
                onDelete={setPendingDelete}
              />
            ))}
          </div>
        )}
      </div>

      {form.open && (
        <EmployeeForm
          mode={form.mode}
          initial={form.mode === 'edit' ? form.employee : undefined}
          existingIds={employees.map((e) => e.employeeId)}
          onClose={() => setForm({ open: false })}
          onSave={(values) => {
            if (form.mode === 'add') {
              setEmployees((prev) => [...prev, values])
              showToast('Employee added')
            } else {
              const originalId = form.employee.employeeId
              setEmployees((prev) =>
                prev.map((e) => (e.employeeId === originalId ? values : e)),
              )
              showToast('Employee updated')
            }
            setForm({ open: false })
          }}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete employee"
          message={`Delete ${pendingDelete.name} (${pendingDelete.employeeId})? This cannot be undone.`}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => {
            setEmployees((prev) =>
              prev.filter((e) => e.employeeId !== pendingDelete.employeeId),
            )
            setPendingDelete(null)
            showToast('Employee deleted')
          }}
        />
      )}

      {toast && <Toast text={toast.text} />}
    </div>
  )
}
