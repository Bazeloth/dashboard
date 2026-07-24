import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useSensor } from '../useSensor';
import { WidgetShell } from './WidgetShell';

export function HumidityWidget({ intervalMs }: { intervalMs: number }) {
    const { history, loading, error } = useSensor('humidity', intervalMs);

    const data = history.map((reading) => ({
        time: new Date(reading.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }),
        value: reading.value,
    }));

    const values = history.map((r) => r.value);
    const latest = values.length ? values[values.length - 1] : null;
    const min = values.length ? Math.min(...values) : null;
    const max = values.length ? Math.max(...values) : null;

    return (
        <WidgetShell title="Humidity (last 5 min)" error={error}>
            {loading && data.length === 0 ? (
                <p className="text-slate-600">Loading…</p>
            ) : (
                <>
                    <p className="sr-only">
                        {latest !== null
                            ? `Humidity chart over the last 5 minutes. Latest reading: ${latest}%. Minimum: ${min}%. Maximum: ${max}%. ${values.length} data points.`
                            : 'Humidity chart: no data yet.'}
                    </p>
                    <div
                        className="-mx-2 h-48"
                        role="img"
                        aria-label={
                            latest !== null
                                ? `Humidity line chart. Latest ${latest}%, range ${min}% to ${max}%.`
                                : 'Humidity line chart, no data yet.'
                        }
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={data}
                                margin={{ top: 8, right: 8, bottom: 0, left: -12 }}
                            >
                                <XAxis
                                    dataKey="time"
                                    tick={{ fontSize: 10, fill: '#475569' }}
                                    stroke="#94a3b8"
                                    minTickGap={24}
                                />
                                <YAxis
                                    domain={[0, 100]}
                                    tick={{ fontSize: 10, fill: '#475569' }}
                                    stroke="#94a3b8"
                                    unit="%"
                                    width={40}
                                />
                                <Tooltip
                                    formatter={(value) => [`${value}%`, 'Humidity']}
                                    labelStyle={{ color: '#0f172a' }}
                                    contentStyle={{ color: '#0f172a' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#1d4ed8"
                                    strokeWidth={2}
                                    dot={false}
                                    isAnimationActive={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </WidgetShell>
    );
}
