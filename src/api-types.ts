// API Types based on Urban Tree API Swagger Documentation

// ============================================================================
// Authentication Types
// ============================================================================

export interface AuthLoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface AuthLoginResponse {
  token: string;
  user: AuthUser;
}

export interface LogoutResponse {
  success: boolean;
}

// ============================================================================
// Tree Types
// ============================================================================

export interface LatestReadingSummary {
  timestamp: string; // ISO date-time
  temperature: number | null;
  humidity: number | null;
  dendrometer: number | null;
  sapflow1: number | null;
  dataSource: string | null;
}

export interface TreeSummary {
  id: string;
  nodeId: string;
  name: string | null;
  location: string | null;
  lat: number | null;
  lon: number | null;
  species: string | null;
  dbh: number | null; // diameter at breast height
  active: boolean;
  latestReading?: LatestReadingSummary;
}

export interface TreeListResponse {
  items: TreeSummary[];
  total: number;
}

export interface TreeDetail extends TreeSummary {
  boardId: string | null;
  sensorDepths: string | null;
  sitePi: string | null;
  createdAt: string; // ISO date-time
  updatedAt: string; // ISO date-time
}

// ============================================================================
// Reading Types
// ============================================================================

export interface ReadingPoint {
  timestamp: string; // ISO date-time
  temperature: number | null;
  pressure: number | null;
  humidity: number | null;
  dendrometer: number | null;
  sapflow1: number | null;
  sapflow2: number | null;
  sapflow3: number | null;
  sapflow4: number | null;
  battery: number | null;
  lipoCharge: number | null;
  dataSource: string | null;
}

export interface TreeReadingsResponse {
  treeId: string;
  count: number;
  items: ReadingPoint[];
}

export interface ProcessedReadingPoint {
  timestamp: string; // ISO date-time
  temperature: number | null;
  pressure: number | null;
  humidity: number | null;
  dendroRaw: number | null;
  sapflowCmPerHr: number | null;
  sfMaxD: number | null;
  sfSignal: number | null;
  sfNoise: number | null;
  dendroMm: number | null;
}

export interface TreeProcessedReadingsResponse {
  treeId: string;
  nodeId: string;
  name: string | null;
  source: 'computed' | 'raw-fallback';
  readings: ProcessedReadingPoint[];
  total: number;
}

export interface TreeReadingSummaryBucket {
  bucketStart: string; // ISO date-time
  bucketEnd: string; // ISO date-time
  bucketSize: 'all' | 'day' | 'hour';
  count: number;
  avgTemperature: number | null;
  minTemperature: number | null;
  maxTemperature: number | null;
  avgPressure: number | null;
  minPressure: number | null;
  maxPressure: number | null;
  avgHumidity: number | null;
  minHumidity: number | null;
  maxHumidity: number | null;
  avgDendroRaw: number | null;
  minDendroRaw: number | null;
  maxDendroRaw: number | null;
  avgDendroMm: number | null;
  minDendroMm: number | null;
  maxDendroMm: number | null;
  avgSapflowCmPerHr: number | null;
  minSapflowCmPerHr: number | null;
  maxSapflowCmPerHr: number | null;
}

export interface TreeReadingSummaryResponse {
  treeId: string;
  nodeId: string;
  name: string | null;
  bucketSize: 'all' | 'day' | 'hour';
  buckets: TreeReadingSummaryBucket[];
}

// ============================================================================
// Import Types
// ============================================================================

export interface ImportJob {
  id: string;
  fileName: string;
  fileSize: number;
  sheetsProcessed: string[] | null;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  recordsImported: number;
  recordsSkipped: number;
  recordsFailed: number;
  warnings: string[] | null;
  errors: string[] | null;
  startedAt: string; // ISO date-time
  completedAt: string | null; // ISO date-time
}

export type ImportJobListResponse = ImportJob[];

// ============================================================================
// System Types
// ============================================================================

export interface HealthResponse {
  status: string;
  service: string;
}

export interface DbCheckResponse {
  status: string;
  db: string;
  service: string;
}

// ============================================================================
// Error Response
// ============================================================================

export interface ErrorResponse {
  error: string;
}

// ============================================================================
// Query Parameters
// ============================================================================

export interface TreeListQueryParams {
  active?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
  withLatest?: boolean;
}

export interface ReadingsQueryParams {
  from?: string; // ISO date-time
  to?: string; // ISO date-time
  source?: 'rawData' | 'archive' | 'all';
  limit?: number;
  order?: 'asc' | 'desc';
}

export interface SummaryQueryParams {
  from?: string; // ISO date-time
  to?: string; // ISO date-time
  source?: 'rawData' | 'archive' | 'all';
  bucketSize?: 'all' | 'day' | 'hour';
  limit?: number;
}