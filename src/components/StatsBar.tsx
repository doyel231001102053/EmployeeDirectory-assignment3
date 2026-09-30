import { DEPARTMENTS, type Department, type Employee } from '../types'

interface StatsBarProps {
  employees: Employee[]
}

export function StatsBar({ employees }: StatsBarProps) {
  const counts = DEPARTMENTS.reduce<Record<Department, number>>(
    (acc, dept) => {
      acc[dept] = employees.filter((e) => e.department === dept).length
      return acc
    },
    {} as Record<Department, number>,
  )

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article className="rounded-[18px] bg-farm px-6 py-5 text-white shadow-[0_8px_24px_rgba(27,138,69,0.18)]">
        <p className="text-sm font-medium tracking-wide text-white/85">
          Total employees
        </p>
        <p className="mt-2 text-4xl font-bold">{employees.length}</p>
      </article>
      {DEPARTMENTS.map((dept) => (
        <article
          key={dept}
          className="rounded-[18px] border border-line bg-white px-6 py-5 shadow-[0_6px_18px_rgba(20,38,27,0.04)]"
        >
          <p className="text-sm font-medium text-muted">{dept}</p>
          <p className="mt-2 text-4xl font-bold text-ink">{counts[dept]}</p>
        </article>
      ))}
    </section>
  )
}
