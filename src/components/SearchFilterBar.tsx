import { DEPARTMENTS } from '../types'

interface SearchFilterBarProps {
  search: string
  department: string
  onSearchChange: (value: string) => void
  onDepartmentChange: (value: string) => void
}

export function SearchFilterBar({
  search,
  department,
  onSearchChange,
  onDepartmentChange,
}: SearchFilterBarProps) {
  return (
    <section className="rounded-[18px] border border-line bg-white p-5 shadow-[0_6px_18px_rgba(20,38,27,0.04)] sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <label className="flex min-w-0 flex-1 flex-col gap-2">
          <span className="text-sm font-medium text-muted">
            Search by name or employee ID
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="e.g. Sunita or FRM-1002"
            className="h-12 rounded-xl border border-line bg-cream px-4 text-ink outline-none transition-opacity duration-200 placeholder:text-muted/70 focus:border-farm"
          />
        </label>
        <label className="flex w-full flex-col gap-2 md:w-64">
          <span className="text-sm font-medium text-muted">Department</span>
          <select
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="h-12 rounded-xl border border-line bg-cream px-4 text-ink outline-none transition-opacity duration-200 focus:border-farm"
          >
            <option value="">All departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
}
