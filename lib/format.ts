const SIZE_UNITS = ["B", "KB", "MB", "GB", "TB"] as const

/** Human-readable size, e.g. 1536 -> "1.5 KB". */
export function formatBytes(bytes: number) {
  if (bytes <= 0) return "0 B"
  const unit = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    SIZE_UNITS.length - 1
  )
  const value = bytes / 1024 ** unit
  const digits = value >= 10 || unit === 0 ? 0 : 1
  return `${value.toFixed(digits)} ${SIZE_UNITS[unit]}`
}

const dateFormat = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

/** e.g. "Nov 22, 2026". */
export function formatDate(value: string | number | Date) {
  return dateFormat.format(new Date(value))
}
