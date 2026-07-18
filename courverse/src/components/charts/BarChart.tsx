interface BarChartProps {
  data: { label: string; value: number }[];
  valueFormatter?: (value: number) => string;
  barColorClassName?: string;
}

export function BarChart({ data, valueFormatter = (v) => `${v}`, barColorClassName = "bg-progress-gradient" }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex h-48 items-end gap-3">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <span className="text-xs font-medium text-text-secondary">{valueFormatter(d.value)}</span>
          <div className="flex w-full flex-1 items-end overflow-hidden rounded-t-md bg-background-secondary">
            <div
              className={`w-full rounded-t-md ${barColorClassName}`}
              style={{ height: `${Math.max((d.value / max) * 100, 4)}%` }}
            />
          </div>
          <span className="text-xs text-text-secondary">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
