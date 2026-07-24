export type SensorType = 'temperature' | 'humidity' | 'pressure';

export interface SensorData {
    id: number;
    type: SensorType;
    value: number;
    timestamp: string;
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// We return a promise that resolves with a random sensor data object to fake a real API call (as browser fetch also returns a promise)
export class SensorApi {
    fetchSensorData(type: SensorType): Promise<SensorData> {
        function getSensorValue() {
            if (type === 'temperature') {
                return getRandomInt(20, 30);
            }

            if (type === 'humidity') {
                return getRandomInt(30, 60);
            }

            if (type === 'pressure') {
                return getRandomInt(900, 1100);
            }

            throw new Error('Invalid sensor type');
        }

        const responseWasSuccessful = Math.random() > 0.1; // 10% failure rate
        const responseTime = getRandomInt(100, 300);

        return new Promise<SensorData>((resolve, reject) => {
            setTimeout(() => {
                if (responseWasSuccessful) {
                    resolve({
                        id: Math.random(),
                        type,
                        value: getSensorValue(),
                        timestamp: Date.now().toString(),
                    });
                } else {
                    reject(new Error('Failed to fetch sensor data'));
                }
            }, responseTime);
        });
    }
}
