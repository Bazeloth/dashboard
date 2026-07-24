import { useSensor } from '../useSensor';
import { WidgetShell } from './WidgetShell';

export function TemperatureWidget({ intervalMs }: { intervalMs: number }) {
    const { latest, loading, error } = useSensor('temperature', intervalMs);

    return (
        <WidgetShell title="Temperature" error={error}>
            {loading && !latest ? (
                <p className="text-slate-600">Loading…</p>
            ) : (
                <p
                    className="text-5xl font-semibold text-slate-900"
                    aria-label={
                        latest ? `Latest temperature: ${latest.value.toFixed(1)} degrees Celsius` : undefined
                    }
                >
                    <span aria-hidden="true">
                        {latest?.value.toFixed(1)}
                        <span className="ml-1 text-2xl text-slate-600">°C</span>
                    </span>
                </p>
            )}
        </WidgetShell>
    );
}
