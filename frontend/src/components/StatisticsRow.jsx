export default function StatisticsRow({asset, value}) {
  return (
    <div className="flex gap-1">
      <p className="text-[var(--color-text-primary)] font-bold" style={{fontSize: 'var(--text-body-primary)'}}>{asset}:</p>
      <p className="text-[var(--color-text-secondary)]" style={{fontSize: 'var(--text-body-primary)'}}>{value}</p>
    </div>
  )
}
