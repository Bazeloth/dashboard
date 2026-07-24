import { useState } from 'react';
import { SensorType } from './api';
import { SidePanel, WidgetVisibility } from './SidePanel';
import { HumidityWidget } from './widgets/HumidityWidget';
import { PressureWidget } from './widgets/PressureWidget';
import { TemperatureWidget } from './widgets/TemperatureWidget';

function App() {
    const [intervalSeconds, setIntervalSeconds] = useState(2);
    const [visibility, setVisibility] = useState<WidgetVisibility>({
        temperature: true,
        humidity: true,
        pressure: true,
    });

    const intervalMs = intervalSeconds * 1000;
    const toggle = (type: SensorType) =>
        setVisibility((prev) => ({ ...prev, [type]: !prev[type] }));

    const visibleCount = Object.values(visibility).filter(Boolean).length;

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow focus:ring-2 focus:ring-blue-600"
            >
                Skip to main content
            </a>
            <div className="mx-auto max-w-6xl">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold">Sensor Dashboard</h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Live readings, updated every {intervalSeconds} second
                        {intervalSeconds === 1 ? '' : 's'}.
                    </p>
                </header>

                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    <SidePanel
                        intervalSeconds={intervalSeconds}
                        onIntervalChange={setIntervalSeconds}
                        visibility={visibility}
                        onToggle={toggle}
                    />

                    <main id="main-content" className="flex-1" tabIndex={-1}>
                        {visibleCount === 0 ? (
                            <p
                                role="status"
                                className="rounded-xl bg-white p-6 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200"
                            >
                                No widgets selected. Enable one from the side panel.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {visibility.temperature && (
                                    <TemperatureWidget intervalMs={intervalMs} />
                                )}
                                {visibility.humidity && <HumidityWidget intervalMs={intervalMs} />}
                                {visibility.pressure && <PressureWidget intervalMs={intervalMs} />}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;
