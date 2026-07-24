import { useEffect, useState } from 'react';
import { SensorApi, SensorType } from './api';

export interface SensorReading {
    value: number;
    timestamp: number;
}

export interface UseSensorResult {
    latest: SensorReading | null;
    history: SensorReading[];
    loading: boolean;
    error: string | null;
}

const HISTORY_WINDOW_MS = 5 * 60 * 1000;

// A shared hook that fetches sensor data from an API and keeps a history of the last 5 minutes
export function useSensor(type: SensorType, intervalMs: number): UseSensorResult {
    const [history, setHistory] = useState<SensorReading[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        const apiMocker = new SensorApi(); // in production: instead of a mock this would be an actual data source/api endpoint

        const tick = async () => {
            try {
                const data = await apiMocker.fetchSensorData(type);
                if (cancelled) return;
                const now = Date.now();
                setHistory((prev) => {
                    const next = [...prev, { value: data.value, timestamp: now }];
                    const cutoff = now - HISTORY_WINDOW_MS;
                    return next.filter((reading) => reading.timestamp >= cutoff);
                });
                setError(null);
            } catch (err) {
                if (cancelled) return;
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        tick();
        const intervalId = setInterval(tick, intervalMs);

        return () => {
            cancelled = true;
            clearInterval(intervalId);
        };
    }, [type, intervalMs]);

    const latest = history.length > 0 ? history[history.length - 1] : null;
    return { latest, history, loading, error };
}
