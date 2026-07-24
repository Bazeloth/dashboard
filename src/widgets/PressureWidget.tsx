import { useSensor } from '../useSensor';
import { WidgetShell } from './WidgetShell';

function Stat({ label, value }: { label: string; value: number | null }) {
    const display = value !== null ? Math.round(value) : null;
    return (
        <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-slate-600">
                {label}
            </dt>
            <dd
                className="mt-1 text-2xl font-semibold text-slate-900"
                aria-label={
                    display !== null
                        ? `${display} hectopascals`
                        : 'no data'
                }
            >
                <span aria-hidden="true">
                    {display ?? '—'}
                    <span className="ml-1 text-sm font-normal text-slate-600">hPa</span>
                </span>
            </dd>
        </div>
    );
}

export function PressureWidget({ intervalMs }: { intervalMs: number }) {
    const { history, loading, error } = useSensor('pressure', intervalMs);

    const values = history.map((reading) => reading.value);
    const min = values.length ? Math.min(...values) : null;
    const max = values.length ? Math.max(...values) : null;
    const avg = values.length ? values.reduce((sum, v) => sum + v, 0) / values.length : null;

    return (
        <WidgetShell title="Pressure (last 5 min)" error={error}>
            {loading && values.length === 0 ? (
                <p className="text-slate-600">Loading…</p>
            ) : (
                <dl className="grid grid-cols-3 gap-4">
                    <Stat label="Min" value={min} />
                    <Stat label="Avg" value={avg} />
                    <Stat label="Max" value={max} />
                </dl>
            )}
        </WidgetShell>
    );
}
