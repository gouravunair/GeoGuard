import { SensorReading, AlertLog } from '@/types';

export const generateMockSensorData = (): SensorReading => {
    const distance = Math.floor(Math.random() * 50) + 10; // 10-60 cm
    const humidity = Math.floor(Math.random() * 40) + 40; // 40-80%
    const temperature = Math.floor(Math.random() * 15) + 20; // 20-35 C

    let risk_level: 'SAFE' | 'WARNING' | 'DANGER' = 'SAFE';

    // Logic from requirements
    // If humidity > 70 AND distance change > 5cm (simulated as low distance or sudden drop)
    // For mock, let's just use absolute values
    if (humidity > 70 && distance < 20) {
        risk_level = 'DANGER';
    } else if (humidity > 60 && distance < 30) {
        risk_level = 'WARNING';
    }

    return {
        id: Date.now(),
        created_at: new Date().toISOString(),
        distance,
        humidity,
        temperature,
        risk_level,
    };
};

export const mockAlerts: AlertLog[] = [
    {
        id: 1,
        created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        message: 'High humidity detected',
        risk_level: 'WARNING',
    },
    {
        id: 2,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        message: 'Operational Normal',
        risk_level: 'SAFE',
    },
];
