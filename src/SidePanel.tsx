import { useId } from 'react';
import { SensorType } from './api';

export type WidgetVisibility = Record<SensorType, boolean>;

interface SidePanelProps {
    intervalSeconds: number;
    onIntervalChange: (seconds: number) => void;
    visibility: WidgetVisibility;
    onToggle: (type: SensorType) => void;
}

const WIDGETS: { type: SensorType; label: string }[] = [
    { type: 'temperature', label: 'Temperature' },
    { type: 'humidity', label: 'Humidity' },
    { type: 'pressure', label: 'Pressure' },
];

export function SidePanel({
    intervalSeconds,
    onIntervalChange,
    visibility,
    onToggle,
}: SidePanelProps) {
    const panelHeadingId = useId();
    const widgetsGroupId = useId();
    const intervalLabelId = useId();
    const intervalValueId = useId();

    return (
        <aside
            aria-labelledby={panelHeadingId}
            className="w-full shrink-0 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:w-64"
        >
            <h2
                id={panelHeadingId}
                className="text-sm font-semibold uppercase tracking-wider text-slate-700"
            >
                Controls
            </h2>

            <fieldset className="mt-6 border-0 p-0">
                <legend
                    id={widgetsGroupId}
                    className="text-xs font-medium uppercase tracking-wider text-slate-600"
                >
                    Widgets
                </legend>
                <div className="mt-3 space-y-2">
                    {WIDGETS.map(({ type, label }) => (
                        <label
                            key={type}
                            className="flex cursor-pointer items-center gap-3 text-sm text-slate-800"
                        >
                            <input
                                type="checkbox"
                                checked={visibility[type]}
                                onChange={() => onToggle(type)}
                                className="h-4 w-4 rounded border-slate-400 text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                            />
                            {label}
                        </label>
                    ))}
                </div>
            </fieldset>

            <section className="mt-6">
                <div className="flex items-baseline justify-between">
                    <label
                        id={intervalLabelId}
                        htmlFor={intervalValueId}
                        className="text-xs font-medium uppercase tracking-wider text-slate-600"
                    >
                        Interval
                    </label>
                    <span aria-hidden="true" className="text-sm font-medium text-slate-800">
                        {intervalSeconds}s
                    </span>
                </div>
                <input
                    id={intervalValueId}
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={intervalSeconds}
                    onChange={(e) => onIntervalChange(Number(e.target.value))}
                    aria-valuemin={1}
                    aria-valuemax={5}
                    aria-valuenow={intervalSeconds}
                    aria-valuetext={`${intervalSeconds} second${intervalSeconds === 1 ? '' : 's'}`}
                    className="mt-3 w-full accent-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                />
                <div
                    aria-hidden="true"
                    className="mt-1 flex justify-between text-xs text-slate-500"
                >
                    <span>1s</span>
                    <span>5s</span>
                </div>
            </section>
        </aside>
    );
}
