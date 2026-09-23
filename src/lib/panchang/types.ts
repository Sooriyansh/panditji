export type PanchangLocation = {
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

export type TimedValue = { name: string; endsAt?: string; pada?: number; paksha?: string };
export type TimeRange = { start: string; end: string };

export type PanchangData = {
  date: string;
  timezone?: string;
  vara?: string;
  tithi?: TimedValue;
  nakshatra?: TimedValue;
  yoga?: TimedValue;
  karana?: TimedValue;
  sunrise?: string;
  sunset?: string;
  moonrise?: string;
  moonset?: string;
  dayPeriods: Partial<Record<"rahuKaal" | "yamaganda" | "gulika" | "abhijitMuhurat" | "brahmaMuhurat", TimeRange>>;
  choghadiya: { day: ChoghadiyaPeriod[]; night: ChoghadiyaPeriod[] };
  muhurats: Muhurat[];
};

export type ChoghadiyaPeriod = TimeRange & { name: string; type?: string; status?: "auspicious" | "inauspicious" | "neutral"; goodFor?: string[] };
export type Muhurat = TimeRange & { title: string; activity?: string };
export type Festival = { date: string; name: string; type?: "festival" | "vrat" | "ekadashi" | "parva" };
export type MonthDay = { date: string; tithi?: string; paksha?: string; markers: Festival[] };
export type MonthlyOverview = { year: number; month: number; days: MonthDay[] };
export type PanchangApiResponse = { details?: PanchangData; month?: MonthlyOverview };
