export type SensorReading = {
  id: number;
  created_at: string;
  distance: number;
  humidity: number;
  temperature: number;
  risk_level: 'SAFE' | 'WARNING' | 'DANGER';
};

// Raw shape from Supabase
export type DatabaseReading = {
  id: number;
  created_at: string;
  device_id: string;
  raw_distance_cm: number;
  avg_distance_cm: number;
  movement_cm: number;
  humidity_percent: number;
  temperature_c: number;
  status: string;
};

export type AlertLog = {
  id: number;
  created_at: string;
  message: string;
  risk_level: 'SAFE' | 'WARNING' | 'DANGER';
};

export type GlobalStats = {
  currentDistance: number;
  currentHumidity: number;
  currentTemperature: number;
  riskLevel: 'SAFE' | 'WARNING' | 'DANGER';
};
