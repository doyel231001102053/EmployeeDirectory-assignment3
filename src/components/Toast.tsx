interface ToastProps {
  text: string
}

export function Toast({ text }: ToastProps) {
  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 z-[60] rounded-xl bg-ink px-4 py-3 text-sm font-medium text-white shadow-[0_10px_24px_rgba(20,38,27,0.25)] animate-[toastIn_200ms_ease-out] motion-reduce:animate-none motion-reduce:-translate-x-1/2"
    >
      {text}
    </div>
  )
}
