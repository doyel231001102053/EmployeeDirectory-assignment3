import type { Employee } from '../types'

interface EmployeeCardProps {
  employee: Employee
  onEdit: (employee: Employee) => void
  onDelete: (employee: Employee) => void
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-sm text-ink">{value}</p>
    </div>
  )
}

export function EmployeeCard({ employee, onEdit, onDelete }: EmployeeCardProps) {
  return (
    <article className="rounded-[18px] border border-line bg-white p-5 shadow-[0_6px_18px_rgba(20,38,27,0.04)] transition-transform duration-200 ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-ink">{employee.name}</h3>
          <p className="mt-0.5 text-sm text-muted">{employee.employeeId}</p>
        </div>
        <span className="shrink-0 rounded-full bg-farm-light px-3 py-1 text-xs font-semibold text-farm">
          {employee.department}
        </span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Gender" value={employee.gender} />
        <Field label="Phone" value={employee.phone} />
        <Field label="Local" value={employee.localAddress} />
        <Field label="Permanent" value={employee.permanentAddress} />
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
        <button
          type="button"
          onClick={() => onEdit(employee)}
          className="rounded-xl bg-farm-light px-4 py-2 text-sm font-semibold text-farm transition-transform duration-150 ease-out hover:bg-[#d0e8c6] active:scale-95 motion-reduce:active:scale-100"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(employee)}
          className="rounded-xl px-4 py-2 text-sm font-medium text-muted transition-colors duration-150 hover:text-red-600 active:scale-95 motion-reduce:active:scale-100"
        >
          Delete
        </button>
      </div>
    </article>
  )
}
